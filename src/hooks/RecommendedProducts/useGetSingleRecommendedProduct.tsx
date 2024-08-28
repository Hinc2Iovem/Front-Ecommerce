import { useEffect, useState } from "react";
import { getSingleRecommendedProducts } from "../../api/queries/recommendedQueries";
import { RecommendedProductsTypes } from "../../types/RecommendedProducts";

export default function useGetSingleRecommendedProduct({
  recommendedProductId,
  productId,
}: {
  recommendedProductId: string;
  productId: string;
}) {
  const [products, setProducts] = useState<RecommendedProductsTypes | null>(
    null
  );
  useEffect(() => {
    getSingleRecommendedProducts({ recommendedProductId, productId }).then(
      (r) => {
        if (r) {
          setProducts(r);
        }
      }
    );
  }, [recommendedProductId, productId]);
  return products;
}
