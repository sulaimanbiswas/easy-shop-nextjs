"use client";
import useCart from "@/hooks/useCart";
import classNames from "@/utils/classNames";
import toast from "react-hot-toast";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

// export const metadata = {
//   title: "Checkout - Easy Shop",
// };

const CheckoutPage = () => {
  const { isLoading, mutate, cart, isValidating } = useCart();

  const handleCount = async (id, action) => {
    try {
      const res = await fetch(`/api/cart?id=${id}&action=${action}`, {
        method: "POST",
      });
      const result = await res.json();
      if (result.added) {
        toast.success(result.message || "Added to cart");
        mutate();
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error.message || "Something went wrong");
    }
  };
  return (
    <div>
      <h1 className="my-5 text-2xl">Review added products</h1>
      {isLoading && <h1 className="my-5 text-2xl font-medium">Loading...</h1>}
      {!isLoading && cart.length === 0 && <h1>No product added to cart</h1>}
      {cart.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table table-lg">
            <thead>
              <tr className="text-center">
                <th>No.</th>
                <th>Title</th>
                <th>Price</th>
                <th>Brand</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(({ _id, title, brand, quantity, price }, i) => (
                <tr key={_id} className="text-center">
                  <th>{i + 1}</th>
                  <td>{title}</td>
                  <td>{price}</td>
                  <td>{brand}</td>
                  <td className="flex items-center justify-center">
                    <button
                      onClick={() => handleCount(_id, "plus")}
                      className={classNames(
                        "btn btn-primary mr-3",
                        isValidating && "cursor-wait"
                      )}
                    >
                      <AiOutlinePlus />
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => handleCount(_id, "minus")}
                      className={classNames(
                        "btn btn-secondary ml-3",
                        isValidating && "cursor-wait"
                      )}
                      disabled={quantity <= 1}
                    >
                      <AiOutlineMinus />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-primary my-3 ml-auto block mr-16">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
