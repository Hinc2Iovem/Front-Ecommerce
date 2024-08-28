import { SubCommentTypes } from "../../types/SubCommentTypes";
import useAxiosPrivate from "../Auth/useAxiosPrivate";

type UpdateSubCommentLikesTypes = {
  subCommentId: string;
  userId: string;
  isLiked: boolean;
};

export default function useUpdateSubCommentLikes() {
  const axiosPrivate = useAxiosPrivate();

  return async ({
    isLiked,
    subCommentId,
    userId,
  }: UpdateSubCommentLikesTypes) => {
    try {
      const res = await axiosPrivate.patch<SubCommentTypes>(
        `/subComments/${subCommentId}/users/${userId}`,
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
