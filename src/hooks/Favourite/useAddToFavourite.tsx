import useAxiosPrivate from "../Auth/useAxiosPrivate";

type AddToFavouriteTypes = {
  productId: string;
  userId: string;
};

export default function useAddToFavourite() {
  const axiosPrivate = useAxiosPrivate();
  return async ({ productId, userId }: AddToFavouriteTypes) => {
    try {
      await axiosPrivate.post(`/favourite/${productId}/users/${userId}`);
    } catch (error) {
      console.error(error);
    }
  };
}
