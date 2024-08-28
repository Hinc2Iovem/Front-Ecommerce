import { CartTypes } from "../../types/CartTypes";
import useAxiosPrivate from "../Auth/useAxiosPrivate";

type RemoveFromCartProps = {
  userId: string;
};

export default function useClearCartByUserId() {
  const axiosPrivate = useAxiosPrivate();
  return async ({ userId }: RemoveFromCartProps) => {
    try {
      return await axiosPrivate
        .delete<CartTypes[]>(`/carts/users/${userId}`)
        .then((r) => r.data);
    } catch (error) {
      console.error(error);
    }
  };
}
