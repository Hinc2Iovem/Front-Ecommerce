import { useCallback, useEffect, useRef, useState } from "react";
import next from "../../../../assets/images/shared/next.png";
import prev from "../../../../assets/images/shared/prev.png";
import useGetDefaultRecommendedProducts from "../../../../hooks/DefaultRecommendedProducts/useGetDefaultRecommendedProducts";
import useGetRecommendedProducts from "../../../../hooks/RecommendedProducts/useGetRecommendedProducts";
import { DefaultRecommendedProductsTypes } from "../../../../types/DefaultRecommendedProducts";
import { RecommendedProductsTypes } from "../../../../types/RecommendedProducts";
import SellerProductDefault from "./SellerProductDefault";
import SellerProductRecommended from "./SellerProductRecommended";

type SellerProductsTypes = {
  showAdditionalInformation: string;
  productId: string;
  category: string;
  sellerId: string | undefined;
  subCategory: string;
};

export type MixedProductTypes =
  | RecommendedProductsTypes
  | DefaultRecommendedProductsTypes;

export default function SellerProducts({
  showAdditionalInformation,
  category,
  productId,
  sellerId,
  subCategory,
}: SellerProductsTypes) {
  const recommendedProducts = useGetRecommendedProducts({ productId });
  const defaultRecommendedProducts = useGetDefaultRecommendedProducts({
    category,
    sellerId: sellerId ?? "",
    subCategory,
  });

  const [products, setProducts] = useState<RecommendedProductsTypes[]>([]);
  const [defaultProducts, setDefaultProducts] = useState<
    DefaultRecommendedProductsTypes[]
  >([]);

  useEffect(() => {
    if (recommendedProducts.length > 0) {
      setProducts(recommendedProducts);
    } else {
      setDefaultProducts(defaultRecommendedProducts);
    }
  }, [recommendedProducts, defaultRecommendedProducts]);

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const updateButtonVisibility = useCallback(() => {
    if (carouselRef.current && showAdditionalInformation === "sellerProducts") {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 2);
    }
  }, [showAdditionalInformation]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
      updateButtonVisibility();
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
      updateButtonVisibility();
    }
  };

  const handleNativeWheel = (event: WheelEvent) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: event.deltaY * 2,
        behavior: "smooth",
      });

      if (event.deltaX === 0) {
        event.preventDefault();
      }
    }
  };

  useEffect(() => {
    const currentCarouselRef = carouselRef.current;
    if (currentCarouselRef) {
      currentCarouselRef.addEventListener("scroll", updateButtonVisibility);
      currentCarouselRef.addEventListener("wheel", handleNativeWheel, {
        passive: false,
      });
    }

    return () => {
      if (currentCarouselRef) {
        currentCarouselRef.removeEventListener(
          "scroll",
          updateButtonVisibility
        );
        currentCarouselRef.removeEventListener("wheel", handleNativeWheel);
      }
    };
  }, [updateButtonVisibility]);

  useEffect(() => {
    updateButtonVisibility();
  }, [products, defaultProducts, updateButtonVisibility]);

  if (!products.length && !defaultProducts.length) {
    return (
      <h2
        className={`${
          showAdditionalInformation === "sellerProducts" ? "" : "hidden"
        } text-[3.5rem] mx-auto text-gray-500 relative`}
      >
        Nothing to show
      </h2>
    );
  }

  return (
    <div
      className={`${
        showAdditionalInformation === "sellerProducts" ? "" : "hidden"
      } w-full rounded-md relative overflow-hidden`}
    >
      {!isAtStart && (
        <button
          className="absolute left-[.5rem] shadow-md hover:scale-[1.02] active:scale-[0.98] top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full"
          onClick={scrollLeft}
        >
          <img src={prev} alt="<" className="w-[3rem]" />
        </button>
      )}
      {!isAtEnd && (
        <button
          className="absolute right-[.5rem] shadow-md hover:scale-[1.02] active:scale-[0.98] top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full"
          onClick={scrollRight}
        >
          <img src={next} alt=">" className="w-[3rem]" />
        </button>
      )}

      <div
        ref={carouselRef}
        className={`overflow-x-auto gap-[1rem] items-center flex w-full p-[1rem]`}
      >
        {products.length
          ? products.map((p) => <SellerProductRecommended key={p._id} {...p} />)
          : defaultProducts.map((p) => (
              <SellerProductDefault key={p._id} {...p} />
            ))}
      </div>
    </div>
  );
}
