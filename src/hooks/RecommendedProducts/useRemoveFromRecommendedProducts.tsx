import useAxiosPrivate from "../Auth/useAxiosPrivate";

type RemoveRecommendedProductTypes = {
  productId: string;
  recommendedProductId: string;
};

export default function useRemoveFromRecommendedProducts() {
  const axiosPrivate = useAxiosPrivate();
  return async ({
    productId,
    recommendedProductId,
  }: RemoveRecommendedProductTypes) => {
    try {
      return await axiosPrivate
        .delete(
          `/recommendedProducts/${recommendedProductId}/products/${productId}`
        )
        .then((r) => r.data);
    } catch (error) {
      console.error(error);
    }
  };
}
