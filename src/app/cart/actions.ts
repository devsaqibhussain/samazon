"use server";
import { CreateCart, GetCart } from "@/lib/db/cart";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export const ChangeProductQuantity = async (productId: string, quantity: number) => {
  const cart = (await GetCart()) ?? (await CreateCart());

  const CartWithEntityExists = cart.items.find(
    (item) => item.productId === productId,
  );

  if (quantity === 0) {
    if (CartWithEntityExists) {
      await prisma.cartItems.delete({
        where: { id: CartWithEntityExists?.id },
      });
    }
  } else {
    if (CartWithEntityExists) {
      await prisma.cartItems.update({
        where: { id: CartWithEntityExists?.id },
        data: {
          quantity,
        },
      });
    } else {
      await prisma.cartItems.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }
  }
  revalidatePath("/cart"); 
};
