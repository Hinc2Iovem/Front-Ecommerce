import { useEffect, useState } from "react";
import { DefaultRecommendedProductsTypes } from "../../types/DefaultRecommendedProducts";
import { getDefaultRecommendedProducts } from "../../api/queries/defaultRecommendedQueries";

type GetDefaultProductsTypes = {
  category: string;
  sellerId: string;
  subCategory: string;
};

export default function useGetDefaultRecommendedProducts({
  category,
  sellerId,
  subCategory,
}: GetDefaultProductsTypes) {
  const [products, setProducts] = useState<
    DefaultRecommendedProductsTypes[] | []
  >([]);
  useEffect(() => {
    getDefaultRecommendedProducts({
      category,
      sellerId,
      subCategory,
    }).then((r) => {
      if (r) {
        setProducts(r);
      }
    });
  }, [category, sellerId, subCategory]);
  return products;
}
