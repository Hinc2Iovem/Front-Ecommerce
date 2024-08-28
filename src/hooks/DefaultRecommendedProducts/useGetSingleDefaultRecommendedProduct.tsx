import { useEffect, useState } from "react";
import { getSingleDefaultRecommendedProduct } from "../../api/queries/defaultRecommendedQueries";
import { DefaultRecommendedProductsTypes } from "../../types/DefaultRecommendedProducts";

export default function useGetSingleDefaultRecommendedProduct({
  category,
  subCategory,
  productId,
}: {
  category: string;
  subCategory: string;
  productId: string;
}) {
  const [products, setProducts] =
    useState<DefaultRecommendedProductsTypes | null>(null);
  useEffect(() => {
    getSingleDefaultRecommendedProduct({
      category,
      productId,
      subCategory,
    }).then((r) => {
      if (r) {
        setProducts(r);
      }
    });
  }, [category, subCategory, productId]);
  return products;
}
