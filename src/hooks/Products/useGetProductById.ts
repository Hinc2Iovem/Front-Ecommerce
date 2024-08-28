import { useEffect, useState } from "react";
import { ProductTypes } from "../../types/ProductTypes";
import { getProductById } from "../../api/queries/productQueries";

export default function useGetProductById(
  productId: string | undefined
): ProductTypes | undefined {
  const [product, setProduct] = useState<ProductTypes>();

  useEffect(() => {
    if (productId !== null) {
      getProductById({ productId: productId as string }).then((r) => {
        if (r) {
          setProduct(r);
        }
      });
    }
  }, [productId]);

  return product ? product : undefined;
}
