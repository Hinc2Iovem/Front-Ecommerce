import { useEffect, useState } from "react";
import { ProductTypes } from "../../types/ProductTypes";
import { getProductsByUserId } from "../../api/queries/productQueries";

export default function useGetProductsByUserId({ userId }: { userId: string }) {
  const [products, setProducts] = useState<ProductTypes[] | []>([]);

  useEffect(() => {
    getProductsByUserId({ userId }).then((r) => {
      if (r) {
        setProducts(r);
      }
    });
  }, [userId]);
  return products;
}
