import prisma from "@/lib/db/prisma";
import React from "react";
import { redirect } from "next/navigation";
import FormSubmitButton from "@/components/buttons/FormSubmitButton";

export const metadata = {
  title: "Add Product - Samazon",
};

// Using server actions:
const createProduct = async (formData: FormData) => {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imgUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing the required fields");
  }

  await prisma.product.createMany({
    data: { name, description, imageUrl, price },
  });

  redirect("/");
};

const AddProduct = () => {
  return (
    <div>
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>Add-Product</li>
        </ul>
      </div>
      <h1 className=" text-2xl font-bold mt-4 rounded-xl bg-base-100 p-4">Add Product</h1>
      <form
        className="form-control mt-4 rounded-xl bg-base-100 p-4"
        action={createProduct}
      >
        <label className="label">
          <span className="label-text text-base font-semibold">
            Product Name:
          </span>
        </label>
        <input
          type="text"
          name="name"
          required
          placeholder="Add product name"
          className="input input-bordered w-full"
        />

        <label className="label">
          <span className="label-text text-base font-semibold">
            Product Description
          </span>
        </label>
        <textarea
          name="description"
          className="textarea textarea-bordered h-24"
          placeholder="Add product description"
          required
        ></textarea>

        <label className="label">
          <span className="label-text text-base font-semibold">Image URL:</span>
        </label>
        <input
          type="url"
          name="imgUrl"
          required
          placeholder="Enter product's image URL"
          className="input input-bordered w-full"
        />

        <label className="label">
          <span className="label-text text-base font-semibold">Price</span>
        </label>
        <input
          type="number"
          name="price"
          required
          placeholder="Add product's price in dollars"
          className="input input-bordered w-full"
        />

        <FormSubmitButton className="btn-accent mt-4">
          Create Product
        </FormSubmitButton>
      </form>
    </div>
  );
};

export default AddProduct;
