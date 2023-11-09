import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db/prisma";
import React from "react";

const HomePage = async () => {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });
  return (
    <div>
      <HeroSection product={products[0]} />
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4 gap-4">
        {products.slice(1).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
