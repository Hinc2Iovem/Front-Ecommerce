import { useCallback } from "react";
import { BecomingSellerRequestTypes } from "../../types/BecomingSellerRequestTypes";
import useAxiosPrivate from "../Auth/useAxiosPrivate";

export default function useGetAllBecomingSellerRequest() {
  const axiosPrivate = useAxiosPrivate();
  return useCallback(async () => {
    try {
      const res = await axiosPrivate.get<BecomingSellerRequestTypes[]>(
        `/requestSellers`
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }, [axiosPrivate]);
}
