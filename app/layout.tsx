import QueryProvider from "@/components/QueryClient/QueryClient";
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import "./globals.css";

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
        <main className=" mt-20 flex justify-center items-center   w-11/12 h-full  min-h-[calc(100vh_-_10rem)] lg:max-w-7xl lg:mt-8">
          <QueryProvider>
            <ClerkProvider>
              <Nav />
              {children}
            </ClerkProvider>
          </QueryProvider>
        </main>
        <footer className="flex w-full justify-center items-center py-5 text-white mt-10  ">
          Made with <span className="text-pink mx-1">♡</span> by Rene van Dijk
        </footer>
      </body>
    </html>
  );
}
