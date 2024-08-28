import { Link } from "react-router-dom";
import { ProductTypes } from "../../../types/ProductTypes";
import { useEffect, useState } from "react";
import FormatCurrency from "../../../utilities/FormatCurrency";
import plus from "../../../assets/images/shared/plus.png";
import minus from "../../../assets/images/shared/minus.png";
import useGetSingleDefaultRecommendedProduct from "../../../hooks/DefaultRecommendedProducts/useGetSingleDefaultRecommendedProduct";
import useAddToDefaultRecommendedProducts from "../../../hooks/DefaultRecommendedProducts/useAddToDefaultRecommendedProducts";
import useRemoveFromDefaultRecommendedProduct from "../../../hooks/DefaultRecommendedProducts/useRemoveFromDefaultRecommendedProduct";

type DefaultProductItemTypes = {
  setCurrentValue: React.Dispatch<React.SetStateAction<number>>;
} & ProductTypes;

export default function DefaultProductItem({
  _id,
  category,
  frontImg,
  price,
  subCategory,
  title,
  userId,
  setCurrentValue,
}: DefaultProductItemTypes) {
  const addToDefaultRecommendedProducts = useAddToDefaultRecommendedProducts();
  const removeFromDefaultRecommendedProducts =
    useRemoveFromDefaultRecommendedProduct();
  const [listOfRecommendeProductIds, setListOfRecommendedProductIds] = useState<
    string[]
  >([]);

  const alreadyRecommended = useGetSingleDefaultRecommendedProduct({
    category,
    productId: _id,
    subCategory,
  });

  useEffect(() => {
    if (alreadyRecommended) {
      setListOfRecommendedProductIds((prev) => [...prev, _id]);
    }
  }, [_id, alreadyRecommended]);

  const handleAddingToRecommended = () => {
    setCurrentValue((prev) => {
      return (prev += 1);
    });
    setListOfRecommendedProductIds((prev) => [...prev, _id]);
    addToDefaultRecommendedProducts({
      category,
      productId: _id,
      sellerId: userId,
      subCategory,
    });
  };

  const handleRemovingFromRecommended = () => {
    setCurrentValue((prev) => {
      return (prev -= 1);
    });
    setListOfRecommendedProductIds((prev) => prev.filter((p) => p !== _id));
    removeFromDefaultRecommendedProducts({
      category,
      sellerId: userId,
      subCategory,
      productId: _id,
    });
  };
  return (
    <div
      className={`w-full mx-auto max-w-[50rem] bg-white h-full overflow-hidden p-[1rem] rounded-lg border-primary-pastel-blue border-[3px] border-dotted flex flex-col gap-[1rem] justify-between`}
    >
      <img
        src={frontImg}
        alt={title}
        className="w-full object-contain max-h-[25rem] h-fit"
      />
      <div className="flex flex-col gap-[.3rem] w-full">
        <Link
          to={`/shop/${_id}`}
          className="font-medium hover:opacity-80 transition-all w-full break-words"
        >
          <h5>{title}</h5>
        </Link>

        <h5 className="font-medium text-[1.5rem]">
          Price: {FormatCurrency(Number(price))}
        </h5>
      </div>
      <button
        onClick={handleAddingToRecommended}
        className={`${
          listOfRecommendeProductIds.includes(_id) ? "hidden" : ""
        } absolute hover:scale-[1.02] active:scale-[0.98]`}
      >
        <img className="w-[3rem]" src={plus} alt="Add" />
      </button>
      <button
        onClick={handleRemovingFromRecommended}
        className={`${
          listOfRecommendeProductIds.includes(_id) ? "" : "hidden"
        } absolute hover:scale-[1.02] active:scale-[0.98]`}
      >
        <img className="w-[3rem]" src={minus} alt="Remove" />
      </button>
    </div>
  );
}
