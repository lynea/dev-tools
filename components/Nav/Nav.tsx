"use client";

import { FunctionComponent } from "react";

import { signIn, signOut, useSession } from "next-auth/react";

export const Nav: FunctionComponent = () => {
  const { data: session } = useSession();

  return (
    <nav className="absolute top-0 text-white flex justify-between w-full px-6 py-4">
      <div>logo</div>
      {session?.user ? (
        <button onClick={() => signOut()}>logout</button>
      ) : (
        <button onClick={() => signIn}>login</button>
      )}
    </nav>
  );
};
