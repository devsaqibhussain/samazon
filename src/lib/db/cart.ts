import { Cart, Prisma } from "@prisma/client";
import prisma from "./prisma";
import { cookies } from "next/headers";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type ShoppingCart = CartWithProducts & {
  size: number;
  subTotal: number;
};

export const CreateCart = async (): Promise<ShoppingCart> => {
  const newCart = await prisma.cart.create({
    data: {},
  });

  // Note needs encription and secure setting when doing production app
  cookies().set("localCartId", newCart.id);
  return {
    ...newCart,
    items: [],
    size: 0,
    subTotal: 0,
  };
};

export const GetCart = async (): Promise<ShoppingCart | null> => {
  const localCartId = cookies().get("localCartId")?.value;

  const cart = localCartId
    ? await prisma.cart.findUnique({
        where: {
          id: localCartId,
        },
        include: { items: { include: { product: true } } },
      })
    : null;

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
