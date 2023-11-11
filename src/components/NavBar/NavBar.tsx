import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.png";

import { redirect } from "next/navigation";
import ShoppingCartBtn from "./ShoppingCartBtn";
import { GetCart } from "@/lib/db/cart";
import UserAccountBtn from "./UserAccountBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const searchProducts = async (formData: FormData) => {
  "use server";
  const searchQuery = await formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect(`/search?query=${searchQuery}`);
  }
};

const NavBar = async () => {
  const session = await getServerSession(authOptions);
  const cart = await GetCart();
  return (
    <div className=" mx-auto">
      <div className="navbar rounded-b-xl bg-base-100">
        <div className="flex-1">
          <Link
            href={"/"}
            className=" btn btn-ghost flex gap-1 text-lg normal-case"
          >
            <Image
              src={logo}
              alt="samazon logo"
              width={40}
              height={40}
              className="h-auto w-auto"
            />
            <p>Samazon</p>
          </Link>
        </div>
        <div className="flex-none sm:gap-2">
          {/* Search Bar */}
          <form action={searchProducts}>
            <div className="form-control">
              <input
                type="text"
                name="searchQuery"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
              />
            </div>
          </form>
          {/* Shopping Cart */}
          <ShoppingCartBtn cart={cart} />

          {/* Profile Picture */}
          <UserAccountBtn session={session} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
