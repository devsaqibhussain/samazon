import { Cart, CartItems, Prisma } from "@prisma/client";
import prisma from "./prisma";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export type CartItemsWithProducts = Prisma.CartItemsGetPayload<{
  include: { product: true };
}>;

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type ShoppingCart = CartWithProducts & {
  size: number;
  subTotal: number;
};

export const CreateCart = async (): Promise<ShoppingCart> => {
  const session = await getServerSession(authOptions);

  let newCart: Cart;

  if (session) {
    newCart = await prisma.cart.create({
      data: { userId: session.user.id },
    });
  } else {
    newCart = await prisma.cart.create({
      data: {},
    });

    // Note needs encription and secure setting when doing production app
    cookies().set("localCartId", newCart.id);
  }
  return {
    ...newCart,
    items: [],
    size: 0,
    subTotal: 0,
  };
};

export const GetCart = async (): Promise<ShoppingCart | null> => {
  const session = await getServerSession(authOptions);

  const localCartId = cookies().get("localCartId")?.value;
  let cart: CartWithProducts | null = null;

  if (session) {
    cart = await prisma.cart.findFirst({
      where: {
        userId: session.user.id,
      },
      include: { items: { include: { product: true } } },
    });
  } else {
    cart = localCartId
      ? await prisma.cart.findUnique({
          where: {
            id: localCartId,
          },
          include: { items: { include: { product: true } } },
        })
      : null;
  }

  if (!cart) {
    return null;
  }

  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subTotal: cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    ),
  };
};

export const MergeLocalCartWithUserCart = async (userId: string) => {
  const localCartId = cookies().get("localCartId")?.value;

  const localCart = localCartId
    ? await prisma.cart.findUnique({
        where: {
          id: localCartId,
        },
        include: { items: true },
      })
    : null;
  if (!localCart) return;

  const userCart = await prisma.cart.findFirst({
    where: {
      userId,
    },
    include: { items: true },
  });

  await prisma.$transaction(async (tx) => {
    if (userCart) {
      //merge
      const mergedCarts = MergeCarts(localCart.items, userCart.items);

      await tx.cartItems.deleteMany({
        where: { cartId: userCart.id },
      });
      await tx.cart.update({
        where: { id: userCart.id },
        data: {
          items: {
            createMany: {
              data: mergedCarts.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    } else {
      //create user cart with local cart items
      await tx.cart.create({
        data: {
          userId,
          items: {
            createMany: {
              data: localCart.items.map((items) => ({
                productId: items.productId,
                quantity: items.quantity,
              })),
            },
          },
        },
      });
    }
    tx.cart.delete({
      where: { id: localCart.id },
    });
    cookies().set("localCartId", "");
    //delete local cart
    //delete cookies
  });
};

const MergeCarts = (...cartItems: CartItems[][]) => {
  return cartItems.reduce((acc, items) => {
    items.map((item) => {
      const existingItem = acc.find((i) => i.productId === item.productId);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        acc.push(item);
      }
    });
    return acc;
  }, [] as CartItems[]);
};
