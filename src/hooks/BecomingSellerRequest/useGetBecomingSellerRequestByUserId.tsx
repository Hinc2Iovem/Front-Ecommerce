import { useCallback } from "react";
import { BecomingSellerRequestTypes } from "../../types/BecomingSellerRequestTypes";
import useAxiosPrivate from "../Auth/useAxiosPrivate";

type BecomingSellerRequestProps = {
  userId: string;
};

export default function useGetBecomingSellerRequestByUserId() {
  const axiosPrivate = useAxiosPrivate();
  return useCallback(
    async ({ userId }: BecomingSellerRequestProps) => {
      try {
        const res = await axiosPrivate.get<BecomingSellerRequestTypes>(
          `/requestSellers/users/${userId}`
        );
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
    [axiosPrivate]
  );
}
