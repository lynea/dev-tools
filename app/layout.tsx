import "./globals.css";

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
      <body className="bg-purple-200 flex justify-center items-center w-full  flex-col">
        <main className="min-h-screen mt-8 flex justify-center items-center max-w-7xl  w-full">
          {children}
        </main>
        <footer className="flex w-full justify-center items-center py-5">
          Made with ♡ by by Rene van Dijk
        </footer>
      </body>
    </html>
  );
}
