"use client";

import PriceTag from "@/components/PriceTag";
import { CartItemsWithProducts } from "@/lib/db/cart";
import Image from "next/image";
import Link from "next/link";
import { ChangeProductQuantity } from "./actions";
import { useTransition } from "react";

interface CartEntryProps {
  cartItem: CartItemsWithProducts;
}

const CartEntries = ({ cartItem: { product, quantity } }: CartEntryProps) => {
  const [isPending, setTransition] = useTransition();
  const quantityOptions: JSX.Element[] = [];
  for (let i: number = 0; i <= 99; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>,
    );
  }
  return (
    <div className="flex rounded-xl bg-base-100 shadow-md">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={150}
        height={150}
        className="rounded-l-xl"
      />

      <div className=" p-4">
        <Link
          href={`/products/${product.id}`}
          className=" mb-2 text-xl font-bold hover:underline"
        >
          {product.name}
        </Link>
        <div>
          <p className=" text-lg font-bold">
            Price: <PriceTag price={product.price} className=" badge-neutral" />
          </p>
          <div className="my-1 flex items-center gap-2">
            <p className=" text-lg font-bold ">Quantity: </p>
            <select
              className="select select-bordered w-full max-w-[80px]"
              defaultValue={quantity}
              onChange={(e) => {
                setTransition(async () => {
                  await ChangeProductQuantity(
                    product.id,
                    parseInt(e.target.value),
                  );
                });
              }}
            >
              {quantityOptions}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <p className=" text-lg font-bold">
              Total Price:{" "}
              <PriceTag
                price={product.price * quantity}
                className=" badge-neutral"
              />
            </p>
              {isPending && <span className=" loading loading-bars text-primary" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartEntries;
