"use client";
import defaultPpf from "@/assets/defaultPfp.jpg";
import { Session } from "next-auth";
import { CgProfile } from "react-icons/cg";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
interface UserAccountBtnProps {
  session: Session | null
}

const UserAccountBtn = ({ session }: UserAccountBtnProps) => {
  const user = session?.user;
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
        {user ? (
          <Image
            src={user.image || defaultPpf}
            alt="profile pic"
            width={40}
            height={40}
            className="w-10 rounded-full"
          />
        ) : (
          <CgProfile className="w-10 rounded-full text-4xl" />
        )}
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
      >
        <li>
          {user ? (
            <button onClick={() => signOut()}>Sign Out</button>
          ) : (
            <button onClick={() => signIn()}>Sign In</button>
          )}
        </li>
        <li>
            <Link href={"/add-product"}>
                Add-Products
            </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserAccountBtn;
