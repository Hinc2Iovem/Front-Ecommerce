import { Link } from "react-router-dom";
import { DefaultRecommendedProductsTypes } from "../../../../types/DefaultRecommendedProducts";
import FormatCurrency from "../../../../utilities/FormatCurrency";
import useGetProductById from "../../../../hooks/Products/useGetProductById";

export default function SellerProductDefault({
  productId,
}: DefaultRecommendedProductsTypes) {
  const product = useGetProductById(productId);

  if (!product) {
    return <h2>...</h2>;
  }

  return (
    <div
      className={`min-w-[20rem] h-[25rem] w-fit bg-white overflow-hidden p-[1rem] rounded-lg border-primary-pastel-blue border-[3px] border-dotted flex flex-col gap-[1rem] justify-between`}
    >
      <img
        src={product.frontImg}
        alt={product.title}
        className="w-full object-contain h-[12rem]"
      />
      <div className="flex flex-col gap-[.3rem] w-full max-w-[25rem]">
        <Link
          to={`/shop/${product._id}`}
          className="font-medium hover:opacity-80 transition-all w-full break-words"
        >
          <h5>
            {product.title.substring(0, 30)
              ? product.title.substring(0, 30) + "..."
              : product.title}
          </h5>
        </Link>

        <h5 className="font-medium text-[1.5rem]">
          Price: {FormatCurrency(Number(product.price))}
        </h5>
      </div>
    </div>
  );
}
