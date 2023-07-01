"use client";

import { UserButton } from "@clerk/nextjs";
import { FunctionComponent } from "react";
import logo from "../../public/logo.svg";
import Image from "next/image";
import Link from "next/link";

export const Nav: FunctionComponent = () => {
  return (
    <nav className="absolute top-0 text-white flex w-full px-6 py-4">
      <Link href="/">
        <Image src={logo} alt="logo" className="h-9 w-40 fill-white mr-6 " />
      </Link>
      <UserButton />
      {/* <div className="ml-4">logo</div> */}
    </nav>
  );
};
