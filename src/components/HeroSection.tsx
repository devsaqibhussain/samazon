import React from "react";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link"
interface ProductProps {
  product: Product;
}

const HeroSection = ({ product }: ProductProps) => {
  return (
    <div className="hero rounded-xl bg-base-100">
      <div className="hero-content flex-col md:flex-row">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={400}
          height={800}
          className="w-full max-w-sm rounded-lg object-cover shadow-2xl"
          priority = {true}
        />
        <div>
          <h1 className="text-5xl font-bold">{product.name}</h1>
          <div className="badge rating badge-accent rating-xs gap-1">
            <input
              type="radio"
              className="mask mask-star-2 bg-black "
              checked
              readOnly
            />
            Featured
          </div>
          <p className="py-6">{product.description}</p>
          <Link href={`/products/${product.id}`}>
            <button className="btn btn-primary">Check Out</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
