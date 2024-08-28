import { Link } from "react-router-dom";
import useGetProductById from "../../hooks/Products/useGetProductById";
import FormatCurrency from "../../utilities/FormatCurrency";
import { CartTypes } from "../../types/CartTypes";

type HeaderCartModalItemTypes = {
  removedProductId: string | undefined;
} & CartTypes;

export default function HeaderCartModalItem({
  productId,
  quantity,
  totalPrice,
  removedProductId,
}: HeaderCartModalItemTypes) {
  const currentProduct = useGetProductById(productId);

  if (!currentProduct) {
    return (
      <div className="flex flex-shrink items-center gap-[.2rem] w-[14.5rem]">
        <div className="w-[2.5rem] h-[2.5rem] object-contain cursor-pointer relative bg-white shadow-sm" />
        <div className="w-full bg-white shadow-sm h-[2.5rem]" />
      </div>
    );
  }

  console.log("removedProductId: ", removedProductId);

  return (
    <>
      <div
        className={`${
          removedProductId === productId ? "hidden" : "flex"
        }  flex-shrink items-center gap-[.2rem] w-[14.5rem] relative`}
      >
        <Link to={`/shop/${productId}`}>
          <img
            src={currentProduct.frontImg}
            alt={currentProduct.title}
            className="w-[2.5rem] h-[2.5rem] object-contain cursor-pointer relative"
          />
        </Link>

        <div className="flex flex-col gap-[.1rem]">
          <h5>
            {FormatCurrency(totalPrice)}{" "}
            <span className="font-bold text-[1.3rem]">x{quantity}</span>
          </h5>
        </div>
      </div>
    </>
  );
}
