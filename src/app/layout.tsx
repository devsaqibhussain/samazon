import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";

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
          <NavBar/>
        <main className=" container mx-auto p-4 ">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
