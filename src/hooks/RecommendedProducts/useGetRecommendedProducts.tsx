import { useEffect, useState } from "react";
import { RecommendedProductsTypes } from "../../types/RecommendedProducts";
import { getRecommendedProducts } from "../../api/queries/recommendedQueries";

export default function useGetRecommendedProducts({
  productId,
}: {
  productId: string;
}) {
  const [products, setProducts] = useState<RecommendedProductsTypes[] | []>([]);
  useEffect(() => {
    getRecommendedProducts({ productId }).then((r) => {
      if (r) {
        setProducts(r);
      }
    });
  }, [productId]);
  return products;
}
