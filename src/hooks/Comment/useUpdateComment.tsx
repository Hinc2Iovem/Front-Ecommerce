import { CommentTypes } from "../../types/CommentTypes";
import useAxiosPrivate from "../Auth/useAxiosPrivate";

type UpdateCommentTypes = {
  commentId: string;
  text: string;
};

export default function useUpdateComment() {
  const axiosPrivate = useAxiosPrivate();
  return async ({ commentId, text }: UpdateCommentTypes) => {
    try {
      const res = await axiosPrivate.patch<CommentTypes>(
        `/comments/${commentId}`,
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
