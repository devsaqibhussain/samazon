"use client";
import { FaCartShopping } from "react-icons/fa6";
import { useTransition, useState } from "react";

interface AddToCartBtnProps {
  productId: string;
  IncrementProductQuantity: (productId: string) => Promise<void>;
}

const AddToCartBtn = ({
  productId,
  IncrementProductQuantity,
}: AddToCartBtnProps) => {
  const [isPending, setTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  return (
    <div className=" flex items-center gap-2">
      {isPending && (
        <span className="loading loading-bars loading-md text-primary" />
      )}
      {!isPending && success && (
        <span className=" text-success">Added To Cart! </span>
      )}
      <button
        className="btn btn-primary"
        onClick={() => {
          setSuccess(false);
          setTransition(async () => {
            await IncrementProductQuantity(productId);
            setSuccess(true);
          });
        }}
      >
        Add to Cart
        <FaCartShopping className="text-xl" />
      </button>
    </div>
  );
};

export default AddToCartBtn;
