import { useEffect, useRef, useState } from "react";
import next from "../../../assets/images/shared/next.png";
import prev from "../../../assets/images/shared/prev.png";
import RecommendedCarouselItem from "./RecommendedCarouselItem";

type RecommendedProductsCarouselTypes = {
  carouselProductIds: string[];
  currentProductId: string;
  setCarouselProductIds: React.Dispatch<React.SetStateAction<string[]>>;
  setProductAmount: React.Dispatch<React.SetStateAction<number>>;
};

export default function RecommendedProductsCarousel({
  carouselProductIds,
  setCarouselProductIds,
  setProductAmount,
  currentProductId,
}: RecommendedProductsCarouselTypes) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const updateButtonVisibility = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
    }
  };

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
  }, []);

  useEffect(() => {
    updateButtonVisibility();
  }, [carouselProductIds]);

  return (
    <div
      className={`${
        carouselProductIds.length && currentProductId ? "" : "hidden"
      } w-full bg-white rounded-md relative overflow-hidden `}
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
        {carouselProductIds.map((pId) => (
          <RecommendedCarouselItem
            key={pId}
            pId={pId}
            currentProductId={currentProductId}
            setCarouselProductIds={setCarouselProductIds}
            setProductAmount={setProductAmount}
          />
        ))}
      </div>
    </div>
  );
}
