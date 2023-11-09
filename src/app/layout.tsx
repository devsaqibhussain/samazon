import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Samazon",
  description: "A place to buy best products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="cupcake">
      <body className={inter.className}>
        <main className=" container mx-auto p-4 ">
          {children}
        </main>
      </body>
    </html>
  );
}
