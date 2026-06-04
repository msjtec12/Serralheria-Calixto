import { getProducts } from "@/app/actions/products";
import { getCategories } from "@/app/actions/categories";
import { ProductClient } from "./product-client";

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div>
      <ProductClient products={products} categories={categories} />
    </div>
  );
}
