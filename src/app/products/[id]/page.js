import getSingleProduct from "@/utils/getSingleProduct";

export const revalidate = 0;

export const metadata = {
  title: "Products - Easy Shop",
};

const ProductDetailsPage = async ({ params: { id } }) => {
  const product = await getSingleProduct(id);

  return (
    <div>
      <h1>{product.title}</h1>
    </div>
  );
};

export default ProductDetailsPage;
