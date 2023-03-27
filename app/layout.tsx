import QueryProvider from "@/components/QueryClient/QueryClient";
import "./globals.css";

import AuthContext from "@/components/AuthContext/AuthContext";
import { Nav } from "@/components/Nav/Nav";

export const metadata = {
  title: "Mijndomein dev tools",
  description: "Created with love by rene van Dijk",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-purple-200 flex justify-center items-center w-full  flex-col min-h-screen">
        <main className=" mt-8 flex justify-center items-center max-w-7xl  w-full h-full  min-h-[calc(100vh_-_10rem)]">
          <AuthContext>
            <Nav />
            {children}
          </AuthContext>
        </main>
        <footer className="flex w-full justify-center items-center py-5 text-white mt-10  ">
          Made with ♡ by Rene van Dijk
        </footer>
      </body>
    </html>
  );
}
