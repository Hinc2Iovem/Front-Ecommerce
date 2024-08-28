import { CartTypes } from "../../types/CartTypes";
import useAxiosPrivate from "../Auth/useAxiosPrivate";

type CheckoutCartProps = {
  userId: string;
};

export default function useCheckoutCart() {
  const axiosPrivate = useAxiosPrivate();

  return async ({ userId }: CheckoutCartProps) => {
    try {
      return await axiosPrivate
        .delete<CartTypes[]>(`/carts/checkout/users/${userId}`)
        .then((r) => r.data);
    } catch (error) {
      console.error(error);
    }
  };
}
