import useAxiosPrivate from "../Auth/useAxiosPrivate";

type UpdateRatingTypes = {
  productId: string | undefined;
  userId: string;
  rating: number;
};

export default function useUpdateRating() {
  const axiosPrivate = useAxiosPrivate();
  return async ({ productId, userId, rating }: UpdateRatingTypes) => {
    try {
      return await axiosPrivate
        .patch(`/products/${productId}/users/${userId}`, {
          rating,
        })
        .then((r) => r.data);
    } catch (error) {
      console.error(error);
    }
  };
}
