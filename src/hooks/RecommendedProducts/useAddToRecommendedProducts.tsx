import useAxiosPrivate from "../Auth/useAxiosPrivate";

type AddRecommendedProductTypes = {
  productId: string;
  recommendedProductId: string;
};

export default function useAddToRecommendedProducts() {
  const axiosPrivate = useAxiosPrivate();
  return async ({
    productId,
    recommendedProductId,
  }: AddRecommendedProductTypes) => {
    try {
      return await axiosPrivate
        .post(`/recommendedProducts/products/${productId}`, {
          recommendedProductId,
        })
        .then((r) => r.data);
    } catch (error) {
      console.error(error);
    }
  };
}
