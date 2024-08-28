import useAxiosPrivate from "../Auth/useAxiosPrivate";

type RemoveDefaultRecommendedProductTypes = {
  sellerId: string;
  productId: string;
  subCategory: string;
  category: string;
};

export default function useRemoveFromDefaultRecommendedProduct() {
  const axiosPrivate = useAxiosPrivate();
  return async ({
    category,
    productId,
    sellerId,
    subCategory,
  }: RemoveDefaultRecommendedProductTypes) => {
    try {
      return await axiosPrivate
        .delete(
          `/defaultRecommendedProducts/products/${productId}/sellers/${sellerId}`,
          {
            params: {
              category,
              subCategory,
            },
          }
        )
        .then((r) => r.data);
    } catch (error) {
      console.error(error);
    }
  };
}
