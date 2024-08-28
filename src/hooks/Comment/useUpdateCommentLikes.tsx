import { CommentTypes } from "../../types/CommentTypes";
import useAxiosPrivate from "../Auth/useAxiosPrivate";

type UpdateCommentLikesTypes = {
  commentId: string;
  userId: string;
  isLiked: boolean;
};

export default function useUpdateCommentLikes() {
  const axiosPrivate = useAxiosPrivate();
  return async ({ commentId, isLiked, userId }: UpdateCommentLikesTypes) => {
    try {
      const res = await axiosPrivate.patch<CommentTypes>(
        `/comments/${commentId}/users/${userId}`,
        {
          isLiked,
        }
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
}
