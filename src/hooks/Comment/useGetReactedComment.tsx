import { useCallback } from "react";
import { ReactedCommentTypes } from "../../types/ReactedCommentTypes";
import useAxiosPrivate from "../Auth/useAxiosPrivate";

type GetReactedCommentTypes = {
  commentId: string;
  userId: string;
};

export default function useGetReactedComment() {
  const axiosPrivate = useAxiosPrivate();
  return useCallback(
    async ({ commentId, userId }: GetReactedCommentTypes) => {
      try {
        const res = await axiosPrivate.get<ReactedCommentTypes>(
          `/reactedComments/${commentId}/users/${userId}`
        );
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
    [axiosPrivate]
  );
}
