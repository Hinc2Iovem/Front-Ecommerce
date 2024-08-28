import { Link } from "react-router-dom";
import { ProductTypes } from "../../../types/ProductTypes";
import FormatCurrency from "../../../utilities/FormatCurrency";
import recommendation from "../../../assets/images/profile/recommendation.png";
import plus from "../../../assets/images/shared/plus.png";
import minus from "../../../assets/images/shared/minus.png";
import useAddToRecommendedProducts from "../../../hooks/RecommendedProducts/useAddToRecommendedProducts";
import useRemoveFromRecommendedProducts from "../../../hooks/RecommendedProducts/useRemoveFromRecommendedProducts";

type RecommendedProductItemTypes = {
  currentProductId: string;
  productAmount: number | null;
  carouselProductIds: string[];
  setCarouselProductIds: React.Dispatch<React.SetStateAction<string[]>>;
  setCurrentProductId: React.Dispatch<React.SetStateAction<string>>;
  setProductAmount: React.Dispatch<React.SetStateAction<number>>;
} & ProductTypes;

export default function RecommendedProductItem({
  _id,
  frontImg,
  price,
  title,
  currentProductId,
  carouselProductIds,
  productAmount,
  setCurrentProductId,
  setCarouselProductIds,
  setProductAmount,
}: RecommendedProductItemTypes) {
  const addToRecommendedProducts = useAddToRecommendedProducts();
  const removeFromRecommendedProducts = useRemoveFromRecommendedProducts();

  const handleAddingToRecommended = () => {
    addToRecommendedProducts({
      recommendedProductId: _id,
      productId: currentProductId,
    });
    if (productAmount) {
      setProductAmount((prev) => (prev -= 1));
    } else {
      setProductAmount(10);
    }
  };

  const handleRemovingFromRecommended = () => {
    setCarouselProductIds((prev) => prev.filter((p) => p !== _id));
    removeFromRecommendedProducts({
      recommendedProductId: _id,
      productId: currentProductId,
    });
    if (productAmount || (productAmount === 0 && currentProductId)) {
      setProductAmount((prev) => (prev += 1));
    } else {
      setProductAmount(10);
    }
  };

  return (
    <div
      className={` ${
        currentProductId === _id ? "hidden" : ""
      } w-full bg-white h-full overflow-hidden p-[1rem] rounded-lg border-primary-pastel-blue border-[3px] border-dotted flex flex-col gap-[1rem] justify-between`}
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
      {carouselProductIds.includes(_id) && currentProductId ? (
        <button
          className="absolute hover:scale-[1.02] active:scale-[0.98]"
          onClick={handleRemovingFromRecommended}
        >
          <img src={minus} alt="X" className="w-[3rem]" />
        </button>
      ) : (
        <button
          className={`${
            currentProductId === _id ? "hidden" : ""
          } absolute hover:scale-[1.02] active:scale-[0.98]`}
          onClick={() => {
            if (currentProductId && currentProductId !== _id) {
              if (productAmount && productAmount >= 1) {
                handleAddingToRecommended();
                setCarouselProductIds((prev) => [...prev, _id]);
              }
            } else {
              setCurrentProductId(_id);
            }
          }}
        >
          <img
            className="w-[3rem]"
            src={currentProductId ? plus : recommendation}
            alt="Add"
          />
        </button>
      )}
    </div>
  );
}
