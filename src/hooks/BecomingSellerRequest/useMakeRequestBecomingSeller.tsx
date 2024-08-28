import { UserTypes } from "../../types/ProfileTypes";
import useAxiosPrivate from "../Auth/useAxiosPrivate";

type MakeRequestBecomingSellerRequestProps = {
  userId: string;
};

export default function useMakeRequestBecomingSeller() {
  const axiosPrivate = useAxiosPrivate();
  return async ({ userId }: MakeRequestBecomingSellerRequestProps) => {
    try {
      const res = await axiosPrivate.post<UserTypes>(
        `/requestSellers/users/${userId}`
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
}
