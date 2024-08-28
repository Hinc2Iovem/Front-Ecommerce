import { UserTypes } from "../../types/ProfileTypes";
import useAxiosPrivate from "../Auth/useAxiosPrivate";

type AllowBecomingSellerRequestProps = {
  userId: string;
  requestId: string;
  status: "allowed" | "denied";
  denyingReason?: string;
};

export default function useAllowBecomingSeller() {
  const axiosPrivate = useAxiosPrivate();
  return async ({
    userId,
    requestId,
    status,
    denyingReason,
  }: AllowBecomingSellerRequestProps) => {
    try {
      const reqBody =
        status === "denied"
          ? {
              denyingReason,
              status,
            }
          : {
              status,
            };

      const res = await axiosPrivate.patch<UserTypes>(
        `/requestSellers/${requestId}/users/${userId}`,
        reqBody
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
}
