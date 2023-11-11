"use client";

import { ShoppingCart } from "@/lib/db/cart";
import { PiShoppingCart } from "react-icons/pi";
import Link from "next/link";
import PriceTag from "../PriceTag";

interface ShoppingCartBtnProps {
  cart: ShoppingCart | null;
}
const ShoppingCartBtn = ({ cart }: ShoppingCartBtnProps) => {
  const CloseDropMenu = () => {
    const elem = document.activeElement as HTMLElement;
    if (elem) {
      elem.blur();
    }
  };
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-circle btn-ghost">
        <div className="indicator">
          <PiShoppingCart className="text-3xl" />
          <span className="badge indicator-item badge-sm">
            {cart?.size || 0}
          </span>
        </div>
      </label>
      <div
        tabIndex={0}
        className="card dropdown-content card-compact z-[1] mt-3 w-52 bg-base-100 shadow"
      >
        <div className="card-body">
          <span className="text-info text-lg font-bold">Items: <span className="badge badge-neutral">{cart?.size || 0} Item(s)</span></span>
          <span className="text-info text-md font-bold">
            Subtotal: <PriceTag price={cart?.subTotal || 0} className=" badge-neutral "/>
          </span>
          <div className="card-actions">
            <Link
              href={"/cart"}
              className="btn btn-accent btn-block"
              onClick={CloseDropMenu}
            >
              View cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartBtn;
