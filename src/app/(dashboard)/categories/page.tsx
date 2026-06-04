import { getCategories } from "@/app/actions/categories";
import { CategoryClient } from "./category-client";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <CategoryClient categories={categories} />
    </div>
  );
}
