import useAxiosPrivate from "../Auth/useAxiosPrivate";

type AddDefaultRecommendedProductTypes = {
  sellerId: string;
  productId: string;
  subCategory: string;
  category: string;
};

export default function useAddToDefaultRecommendedProducts() {
  const axiosPrivate = useAxiosPrivate();
  return async ({
    category,
    productId,
    sellerId,
    subCategory,
  }: AddDefaultRecommendedProductTypes) => {
    try {
      return await axiosPrivate
        .put(`/defaultRecommendedProducts/sellers/${sellerId}`, {
          productId,
          subCategory,
          category,
        })
        .then((r) => r.data);
    } catch (error) {
      console.error(error);
    }
  };
}
