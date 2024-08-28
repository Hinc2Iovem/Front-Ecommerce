import { useCallback } from "react";
import { ReactedCommentTypes } from "../../types/ReactedCommentTypes";
import useAxiosPrivate from "../Auth/useAxiosPrivate";

type GetReactedSubCommentTypes = {
  subCommentId: string;
  userId: string;
};

export default function useGetReactedSubComment() {
  const axiosPrivate = useAxiosPrivate();
  return useCallback(
    async ({ subCommentId, userId }: GetReactedSubCommentTypes) => {
      try {
        const res = await axiosPrivate.get<ReactedCommentTypes>(
          `/reactedSubComments/${subCommentId}/users/${userId}`
        );
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
    [axiosPrivate]
  );
}
