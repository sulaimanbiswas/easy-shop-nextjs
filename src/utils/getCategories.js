import { getCategoriesFromDb } from "@/services/category.service";
import { cache } from "react";
import "server-only";

const getCategories = cache(getCategoriesFromDb);

export default getCategories;
