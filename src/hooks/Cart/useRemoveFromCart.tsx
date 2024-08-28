import { CartTypes } from "../../types/CartTypes";
import useAxiosPrivate from "../Auth/useAxiosPrivate";

type RemoveFromCartProps = {
  cartId: string;
};

export default function useRemoveFromCart() {
  const axiosPrivate = useAxiosPrivate();
  return async ({ cartId }: RemoveFromCartProps) => {
    try {
      return await axiosPrivate
        .delete<CartTypes[]>(`/carts/${cartId}`)
        .then((r) => r.data);
    } catch (error) {
      console.error(error);
    }
  };
}
