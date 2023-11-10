import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.png";
import defaultPpf from "@/assets/defaultPfp.jpg";

import { redirect } from "next/navigation";
import ShoppingCartBtn from "./ShoppingCartBtn";
import { GetCart } from "@/lib/db/cart";

const searchProducts = async (formData: FormData) => {
  "use server";
  const searchQuery = await formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect(`/search?query=${searchQuery}`);
  }
};

const NavBar = async () => {
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
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
              <div className="w-10 rounded-full">
                <Image
                  src={defaultPpf}
                  alt="profile pic"
                  width={40}
                  height={40}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
