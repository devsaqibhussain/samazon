import HeroSection from "@/components/HeroSection";
import PaginationBtns from "@/components/PaginationBtns";
import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db/prisma";
import React from "react";

interface HomePageProps {
  searchParams: { page: string };
}

const HomePage = async ({ searchParams: { page = "1" } }: HomePageProps) => {
  const currentPage = parseInt(page);
  const HeroSectionCount = 1;
  const ProductsPerPage = 8;
  const TotalProducts = await prisma.product.count();

  const NumberOfPages = Math.ceil(
    (TotalProducts - HeroSectionCount) / ProductsPerPage,
  );

  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip:
      (currentPage - 1) * ProductsPerPage +
      (currentPage === 1 ? 0 : HeroSectionCount),
    take: ProductsPerPage + (currentPage === 1 ? HeroSectionCount : 0),
  });

  return (
    <div>
      {currentPage === 1 && <HeroSection product={products[0]} />}
      
      <div className=" mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {(currentPage ===1 ? products.slice(1): products).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      {NumberOfPages > 1 && (
        <PaginationBtns
          currentPage={currentPage}
          NumberOfPages={NumberOfPages}
        />
      )}
    </div>
  );
};

export default HomePage;
