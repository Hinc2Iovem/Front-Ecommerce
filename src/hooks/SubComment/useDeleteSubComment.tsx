import { SubCommentTypes } from "../../types/SubCommentTypes";
import useAxiosPrivate from "../Auth/useAxiosPrivate";

type DeleteSubCommentTypes = {
  subCommentId: string;
};

export default function useDeleteSubComment() {
  const axiosPrivate = useAxiosPrivate();
  return async ({ subCommentId }: DeleteSubCommentTypes) => {
    try {
      const res = await axiosPrivate.delete<SubCommentTypes>(
        `/subComments/${subCommentId}`
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
}
