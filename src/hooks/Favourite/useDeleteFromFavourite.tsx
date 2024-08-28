import useAxiosPrivate from "../Auth/useAxiosPrivate";

type DeleteFromFavouriteTypes = {
  productId: string;
  userId: string;
};

export default function useDeleteFromFavourite() {
  const axiosPrivate = useAxiosPrivate();
  return async ({ productId, userId }: DeleteFromFavouriteTypes) => {
    try {
      await axiosPrivate.delete(`/favourite/${productId}/users/${userId}`);
    } catch (error) {
      console.error(error);
    }
  };
}
