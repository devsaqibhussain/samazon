import React from "react";
import { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import PriceTag from "./PriceTag";

interface ProductProps {
  product: Product;
}

const HeroSection = ({ product }: ProductProps) => {
  return (
    <div className="hero bg-base-100 rounded-xl">
      <div className="hero-content flex-col lg:flex-row">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={800}
          height={300}
          className="max-w-sm w-full rounded-lg shadow-2xl object-cover"
          priority
        />
        <div>
          <h1 className="text-5xl font-bold">{product.name}</h1>
          <p className="py-6">
            {product.description}
          </p>
          <button className="btn btn-primary">Check Out</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
