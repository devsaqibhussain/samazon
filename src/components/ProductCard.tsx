import React from "react";
import { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import PriceTag from "./PriceTag";

interface ProductProps {
  product: Product;
}

const ProductCard = ({ product }: ProductProps) => {
  const isNew =
    Date.now() - new Date(product.createAt).getTime() < 1000 * 60 * 60 * 24 * 7;
  return (
    <Link
      href={`/products/${product.id}`}
      className="card w-full bg-base-100 hover:shadow-xl transition-shadow"
    >
      <figure>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={800}
          height={400}
          className=" h-64 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        {isNew && <div className=" badge badge-accent">New</div>}
        <p className="line-clamp-5">{product.description}</p>
        <PriceTag price={product.price} className=" badge-primary"/>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
