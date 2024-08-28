import { Link } from "react-router-dom";
import FormatCurrency from "../../utilities/FormatCurrency";
import exit from "../../assets/images/shared/exit.png";
import { useEffect, useState } from "react";
import { ProductTypes } from "../../types/ProductTypes";
import { getProductById } from "../../api/queries/productQueries";

type RecommendedLeftSideTypes = {
  currentProductId: string;
  setCurrentProductId: React.Dispatch<React.SetStateAction<string>>;
  setCarouselProductIds: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function RecommendedLeftSide({
  currentProductId,
  setCurrentProductId,
  setCarouselProductIds,
}: RecommendedLeftSideTypes) {
  const [product, setProduct] = useState<ProductTypes | null>(null);
  const [leftItemUpdated, setLeftItemUpdated] = useState(false);

  useEffect(() => {
    getProductById({ productId: currentProductId }).then((r) => {
      if (r) {
        setProduct(r);
      } else {
        setProduct(null);
      }
    });
  }, [currentProductId]);

  useEffect(() => {
    if (leftItemUpdated) {
      setProduct(null);
      setLeftItemUpdated(false);
    }
  }, [leftItemUpdated, setLeftItemUpdated]);

  if (!product) {
    return (
      <div className="shrink-0 w-[30rem] md:mx-0 mx-auto min-h-[40rem] h-fit flex flex-col gap-[1rem] border-dotted border-[2px] border-primary-pastel-blue bg-white"></div>
    );
  }

  return (
    <div className="p-[1rem] shrink-0 h-fit w-[30rem] md:mx-0 mx-auto min-h-[40rem] flex flex-col gap-[1rem] border-dotted border-[2px] border-primary-pastel-blue bg-white justify-between">
      <button
        className="absolute"
        onClick={() => {
          setCarouselProductIds([]);
          setLeftItemUpdated(true);
          setCurrentProductId("");
        }}
      >
        <img src={currentProductId ? exit : ""} alt="" className="w-[3rem]" />
      </button>
      <img
        src={product.frontImg}
        alt={product.title}
        className="w-full object-contain h-[25rem]"
      />
      <div className="flex flex-col gap-[.3rem] w-full">
        <Link
          to={`/shop/${product._id}`}
          className="font-medium hover:opacity-80 transition-all w-full break-words"
        >
          <h5>{product.title}</h5>
        </Link>

        <h5 className="font-medium text-[1.5rem]">
          Price: {FormatCurrency(Number(product.price ? product.price : 0))}
        </h5>
      </div>
    </div>
  );
}
