"use client";

import { UserButton } from "@clerk/nextjs/app-beta";
import { FunctionComponent } from "react";

export const Nav: FunctionComponent = () => {
  return (
    <nav className="absolute top-0 text-white flex w-full px-6 py-4">
      <UserButton />
      <div className="ml-4">logo</div>
    </nav>
  );
};
