import { ReactedCommentTypes } from "../../types/ReactedCommentTypes";
import { SubCommentTypes } from "../../types/SubCommentTypes";
import { axiosPublic } from "../axios";

export const getAllSubComments = async ({
  commentId,
}: {
  commentId: string;
}) => {
  try {
    const res = await axiosPublic.get<SubCommentTypes[]>(
      `/subComments/comments/${commentId}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getReactedSubCommentByUserIdSubCommentId = async ({
  userId,
  subCommentId,
}: {
  userId: string;
  subCommentId: string;
}) => {
  try {
    const res = await axiosPublic.get<ReactedCommentTypes>(
      `/reactedSubComments/${subCommentId}/users/${userId}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
