import { useEffect, useState } from "react";
import { RecommendedProductsAmountTypes } from "../../types/RecommendedProducts";
import { getRecommendedSellerProductsAmount } from "../../api/queries/recommendedQueries";

type GetProductsTypes = {
  productId: string;
};
export default function useGetRecommendedProductsAmount({
  productId,
}: GetProductsTypes) {
  const [products, setProducts] = useState<RecommendedProductsAmountTypes>();
  useEffect(() => {
    getRecommendedSellerProductsAmount({
      productId,
    }).then((r) => {
      if (r) {
        setProducts(r);
      }
    });
  }, [productId]);
  return products;
}
