import { Link } from "react-router-dom";
import minus from "../../../assets/images/shared/minus.png";
import useGetProductById from "../../../hooks/Products/useGetProductById";
import FormatCurrency from "../../../utilities/FormatCurrency";
import useRemoveFromRecommendedProducts from "../../../hooks/RecommendedProducts/useRemoveFromRecommendedProducts";

type RecommendedCarouselItemTypes = {
  pId: string;
  currentProductId: string;
  setCarouselProductIds: React.Dispatch<React.SetStateAction<string[]>>;
  setProductAmount: React.Dispatch<React.SetStateAction<number>>;
};

export default function RecommendedCarouselItem({
  pId,
  setCarouselProductIds,
  setProductAmount,
  currentProductId,
}: RecommendedCarouselItemTypes) {
  const recommendedProduct = useGetProductById(pId);
  const removeFromRecommendedProducts = useRemoveFromRecommendedProducts();

  if (!recommendedProduct) {
    return <h2>...</h2>;
  }
  const handleRemovingFromRecommended = () => {
    setCarouselProductIds((prev) => prev.filter((p) => p !== pId));
    setProductAmount((prev) => (prev += 1));
    removeFromRecommendedProducts({
      recommendedProductId: pId,
      productId: currentProductId,
    });
  };
  return (
    <div
      className={`min-w-[20rem] h-[40rem] w-full max-w-[50rem] bg-white overflow-hidden p-[1rem] rounded-lg border-primary-pastel-blue border-[3px] border-dotted flex flex-col gap-[1rem] justify-between`}
    >
      <img
        src={recommendedProduct.frontImg}
        alt={recommendedProduct.title}
        className="w-full object-contain h-[25rem]"
      />
      <div className="flex flex-col gap-[.3rem] w-full">
        <Link
          to={`/shop/${recommendedProduct._id}`}
          className="font-medium hover:opacity-80 transition-all w-full break-words"
        >
          <h5>{recommendedProduct.title}</h5>
        </Link>

        <h5 className="font-medium text-[1.5rem]">
          Price: {FormatCurrency(Number(recommendedProduct.price))}
        </h5>
      </div>

      <button
        onClick={handleRemovingFromRecommended}
        className="absolute hover:scale-[1.02] active:scale-[0.98]"
      >
        <img src={minus} alt="X" className="w-[3rem]" />
      </button>
    </div>
  );
}
