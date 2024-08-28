import { CommentTypes } from "../../types/CommentTypes";
import useAxiosPrivate from "../Auth/useAxiosPrivate";

type CreateCommentTypes = {
  productId: string;
  userId: string;
  text: string;
};

export default function useCreateComment() {
  const axiosPrivate = useAxiosPrivate();

  return async ({ productId, text, userId }: CreateCommentTypes) => {
    try {
      const res = await axiosPrivate.post<CommentTypes>(
        `/comments/products/${productId}/users/${userId}`,
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
