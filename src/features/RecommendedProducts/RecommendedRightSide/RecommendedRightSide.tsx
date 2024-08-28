import { useMemo } from "react";
import useGetProductsByUserId from "../../../hooks/Profile/useGetProductsByUserId";
import { ProductTypes } from "../../../types/ProductTypes";
import RecommendedProductItem from "./RecommendedProductItem";

type RecommendedRightSideTypes = {
  userId: string;
  currentProductId: string;
  currentCategory: string;
  debouncedValue: string;
  productAmount: number | null;
  carouselProductIds: string[];
  setCurrentProductId: React.Dispatch<React.SetStateAction<string>>;
  setCarouselProductIds: React.Dispatch<React.SetStateAction<string[]>>;
  setProductAmount: React.Dispatch<React.SetStateAction<number>>;
};

export default function RecommendedRightSide({
  userId,
  currentProductId,
  currentCategory,
  debouncedValue,
  carouselProductIds,
  productAmount,
  setCarouselProductIds,
  setCurrentProductId,
  setProductAmount,
}: RecommendedRightSideTypes) {
  const products = useGetProductsByUserId({ userId });

  const productsToDisplay: ProductTypes[] = useMemo(() => {
    let filtered: ProductTypes[] = products;

    if (currentCategory !== "All") {
      filtered = filtered.filter((p) =>
        p.category.toLowerCase().includes(currentCategory.toLowerCase())
      );
    }
    if (debouncedValue) {
      filtered = filtered.filter(
        (p) =>
          p.title
            .trim()
            .toLowerCase()
            .includes(debouncedValue.trim().toLowerCase()) ||
          p.description
            .trim()
            .toLowerCase()
            .includes(debouncedValue.trim().toLowerCase())
      );
    }
    return filtered;
  }, [products, currentCategory, debouncedValue]);

  return (
    <div className="border-white w-full border-double border-[3px] grid grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] grid-rows-[repeat(auto-fit,minmax(30rem,1fr))] p-3 gap-3 justify-items-center items-center">
      {productsToDisplay.length > 0 &&
        productsToDisplay.map((p) => (
          <RecommendedProductItem
            key={p._id}
            currentProductId={currentProductId}
            setCurrentProductId={setCurrentProductId}
            setCarouselProductIds={setCarouselProductIds}
            setProductAmount={setProductAmount}
            carouselProductIds={carouselProductIds}
            productAmount={productAmount}
            {...p}
          />
        ))}
    </div>
  );
}
