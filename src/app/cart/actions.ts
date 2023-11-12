"use server";
import { CreateCart, GetCart } from "@/lib/db/cart";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export const ChangeProductQuantity = async (
  productId: string,
  quantity: number,
) => {
  const cart = (await GetCart()) ?? (await CreateCart());

  const CartWithEntityExists = cart.items.find(
    (item) => item.productId === productId,
  );

  if (quantity === 0) {
    if (CartWithEntityExists) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            delete: {
              id: CartWithEntityExists.id,
            },
          },
        },
      });
    }
  } else {
    if (CartWithEntityExists) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            update: {
              where: { id: CartWithEntityExists.id },
              data: { quantity },
            },
          },
        },
      });
    } else {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            create: {
              productId,
              quantity,
            },
          },
        },
      });
    }
  }
  revalidatePath("/cart");
};
