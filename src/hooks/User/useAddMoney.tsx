import { UserTypes } from "../../types/ProfileTypes";
import useAxiosPrivate from "../Auth/useAxiosPrivate";

export default function useAddMoney() {
  const axiosPrivate = useAxiosPrivate();
  return async ({ userId, money }: { userId: string; money: number }) => {
    try {
      const res = await axiosPrivate.patch<UserTypes>(
        `/users/${userId}/money`,
        {
          amountOfMoney: money,
        }
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
}
