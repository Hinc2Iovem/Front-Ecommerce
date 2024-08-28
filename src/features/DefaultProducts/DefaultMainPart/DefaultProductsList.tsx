import { useMemo } from "react";
import useGetProductsByUserId from "../../../hooks/Profile/useGetProductsByUserId";
import { ProductTypes } from "../../../types/ProductTypes";
import DefaultProductItem from "./DefaultProductItem";

type DefaultProductsListTypes = {
  currentCategory: string;
  currentSubCategory: string;
  debouncedValue: string;
  userId: string;
  setCurrentValue: React.Dispatch<React.SetStateAction<number>>;
};

export default function DefaultProductsList({
  currentCategory,
  currentSubCategory,
  debouncedValue,
  userId,
  setCurrentValue,
}: DefaultProductsListTypes) {
  const products = useGetProductsByUserId({ userId });
  const productsToDisplay: ProductTypes[] = useMemo(() => {
    let filtered: ProductTypes[] = products;

    if (currentCategory) {
      filtered = filtered.filter((p) =>
        p.category.toLowerCase().includes(currentCategory.toLowerCase())
      );
    }
    if (currentSubCategory) {
      filtered = filtered.filter((p) =>
        p.subCategory.toLowerCase().includes(currentSubCategory.toLowerCase())
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
  }, [currentSubCategory, currentCategory, debouncedValue, products]);

  return (
    <div
      className={`${
        currentCategory && currentSubCategory ? "" : "hidden"
      } grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] gap-[1rem]`}
    >
      {productsToDisplay.map((p) => (
        <DefaultProductItem
          key={p._id}
          setCurrentValue={setCurrentValue}
          {...p}
        />
      ))}
    </div>
  );
}
