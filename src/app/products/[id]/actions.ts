"use server";
import { GetCart, CreateCart } from "@/lib/db/cart";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";


export const IncrementProductQuantity = async (productId:string) => {
  const cart = (await GetCart()) ?? (await CreateCart());

  //Checking if the product exists or not, if it does exist we simply increment the quantity otherwise we add the product to cart.

  const CartWithEntityExists = cart.items.find(
    (item) => item.productId === productId,
  );

  if (CartWithEntityExists) {
    await prisma.cartItems.update({
      where: { id: CartWithEntityExists.id },
      data: { quantity: { increment: 1 } },
    });
  } else {
    await prisma.cartItems.create({
      data: {
        productId,
        quantity: 1,
        cartId: cart.id,
      },
    });
  }

  revalidatePath("/products/[id]")
};
