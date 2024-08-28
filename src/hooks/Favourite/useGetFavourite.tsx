import { useCallback } from "react";
import useAxiosPrivate from "../Auth/useAxiosPrivate";

type GetFavouriteTypes = {
  productId: string | undefined;
  userId: string;
};

export default function useGetFavourite() {
  const axiosPrivate = useAxiosPrivate();
  return useCallback(
    async ({ productId, userId }: GetFavouriteTypes) => {
      try {
        return await axiosPrivate
          .get(`/favourite/${productId}/users/${userId}`)
          .then((r) => r.data);
      } catch (error) {
        console.error(error);
      }
    },
    [axiosPrivate]
  );
}
