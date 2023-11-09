import { getProductIdFromDb } from "@/services/product.service";
import { cache } from "react";
import "server-only";

const getSingleProduct = cache(getProductIdFromDb);

export default getSingleProduct;
