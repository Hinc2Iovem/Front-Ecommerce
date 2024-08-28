import { SubCommentTypes } from "../../types/SubCommentTypes";
import useAxiosPrivate from "../Auth/useAxiosPrivate";

type CreateSubCommentTypes = {
  commentId: string;
  userId: string;
  text: string;
};

export default function useCreateSubComment() {
  const axiosPrivate = useAxiosPrivate();

  return async ({ commentId, text, userId }: CreateSubCommentTypes) => {
    try {
      const res = await axiosPrivate.post<SubCommentTypes>(
        `/subComments/comments/${commentId}/users/${userId}`,
        {
          text,
        }
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
}
