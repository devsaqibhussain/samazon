import PriceTag from "@/components/PriceTag";
import prisma from "@/lib/db/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import { Metadata } from "next";
import AddToCartBtn from "./AddToCartBtn";
import {IncrementProductQuantity} from "./actions"

interface ProductPageProps {
  params: {
    id: string;
  };
}

const GetProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) notFound();
  return product;
});

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await GetProduct(id);
  return {
    title: product.name + " - Samazon",
    description: product.description,
    openGraph: { images: [{ url: product.imageUrl }] },
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await GetProduct(id);
  return (
    <>
      <div className="breadcrumbs text-sm mb-4">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>Products</li>
          <li>{product.name}</li>
        </ul>
      </div>
      <div className=" rounded-xl bg-base-100 p-4 text-lg font-bold">
        Product Details:
      </div>
      <div className="card mt-4 bg-base-100 shadow-xl lg:card-side">
        <figure>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={1000}
            height={500}
            className="max-h-[500px] w-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p className="max-w-[800px]">{product.description}</p>
          <div className="card-actions items-center justify-between">
            <PriceTag
              price={product.price}
              className=" badge-primary badge-lg"
            />
            <AddToCartBtn productId={product.id} IncrementProductQuantity={IncrementProductQuantity} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
