import { SubCommentTypes } from "../../types/SubCommentTypes";
import useAxiosPrivate from "../Auth/useAxiosPrivate";

type UpdateSubCommentTypes = {
  subCommentId: string;
  text: string;
};

export default function useUpdateSubComment() {
  const axiosPrivate = useAxiosPrivate();
  return async ({ subCommentId, text }: UpdateSubCommentTypes) => {
    try {
      const res = await axiosPrivate.patch<SubCommentTypes>(
        `/subComments/${subCommentId}`,
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
