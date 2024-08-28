import { CartTypes } from "../../types/CartTypes";
import useAxiosPrivate from "../Auth/useAxiosPrivate";

type AddToCartParamTypes = {
  userId: string;
  productId: string;
  quantity: number;
};

export default function useDecreaseAmountFromCart() {
  const axiosPrivate = useAxiosPrivate();
  return async ({ productId, quantity, userId }: AddToCartParamTypes) => {
    try {
      return await axiosPrivate
        .patch<CartTypes[]>(`/carts/users/${userId}/products/${productId}`, {
          quantity,
        })
        .then((r) => r.data);
    } catch (error) {
      console.error(error);
    }
  };
}
