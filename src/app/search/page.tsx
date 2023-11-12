import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db/prisma";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";

interface SearchPageProps {
  searchParams: { query: string };
}

export const generateMetadata = ({searchParams:{query}}:SearchPageProps):Metadata =>{
  return {
    title: `Search: ${query} - Samazon`
  }
}

const SearchPage = async ({ searchParams: { query } }: SearchPageProps) => {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { id: "desc" },
  });
  revalidatePath("/search");
  if (!products) {
    return <div>No product matches the: {query}</div>;
  }
  return (
    <div className=" grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default SearchPage;
