import getProducts from "@/utils/getProducts";
import SingleProduct from "./SingleProduct";

export const revalidate = 0;

export const metadata = {
  title: "Products - Easy Shop",
};

const ProductsPage = async ({ searchParams: { categoryId } }) => {
  const products = await getProducts(categoryId);

  return (
    <div className="mt-10">
      <div className="grid grid-cols-3 gap-5 mb-5">
        {products.map((product) => (
          <SingleProduct key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
