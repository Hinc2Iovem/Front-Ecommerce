import { useCallback } from "react";
import { CartTypes } from "../../types/CartTypes";
import useAxiosPrivate from "../Auth/useAxiosPrivate";

type GetAllCartsProps = {
  userId: string;
};

export default function useGetAllCarts() {
  const axiosPrivate = useAxiosPrivate();

  return useCallback(
    async ({ userId }: GetAllCartsProps) => {
      try {
        return await axiosPrivate
          .get<CartTypes[]>(`/carts/users/${userId}`)
          .then((r) => r.data);
      } catch (error) {
        console.error(error);
      }
    },
    [axiosPrivate]
  );
}
