import PriceTag from "@/components/PriceTag";
import { GetCart } from "@/lib/db/cart";
import prisma from "@/lib/db/prisma";
import Image from "next/image";
import React from "react";
import CartEntries from "./CartEntries";

export const metadata = {
  title: "Products Cart - Samazon",
};

const CartPage = async () => {
  const cart = await GetCart();

  return (
    <div>
      <h2 className=" rounded-xl bg-base-100 p-4 text-xl font-bold">
        Shopping Cart:
      </h2>
      <div className=" mt-4 flex flex-col gap-4 lg:flex-row">
        <div className=" flex-1">
          <div className=" flex flex-col gap-4 lg:max-h-[50vh] sm:overflow-auto">
            {cart?.items.map((item) => (
              <div key={item.id}>
                <CartEntries cartItem={item} />
              </div>
            ))}
          </div>
          <div className=" mt-4 flex justify-between rounded-xl bg-base-100 p-4">
            <h2 className=" text-lg font-semibold">SubTotal:</h2>
            <h2 className=" text-lg font-semibold">
              <PriceTag price={cart?.subTotal || 0} />
            </h2>
          </div>
        </div>

        <div className="flex h-fit flex-col gap-2 rounded-xl bg-base-100 p-4 lg:max-w-[300px] shadow-lg">
          <p className=" text-sm text-green-400">
            Your order qualifies for FREE DELIVERY.
          </p>
          <p className=" text-sm text-green-400">Delivery Details:</p>
          <div className=" flex justify-between">
            <p>Number of items:</p>
            <p>{cart?.size || 0} items</p>
          </div>
          <div className=" flex justify-between">
            <p>Delivery Charges: </p>
            <PriceTag price={0} />
          </div>
          <div className=" flex justify-between">
            <p>Total Price:</p>
            <PriceTag price={cart?.subTotal || 0} />
          </div>

          <button className=" btn btn-accent ">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
