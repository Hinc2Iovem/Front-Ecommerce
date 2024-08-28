import { CommentTypes } from "../../types/CommentTypes";
import { axiosPublic } from "../axios";

export const getAllComments = async ({ productId }: { productId: string }) => {
  try {
    const res = await axiosPublic.get<CommentTypes[]>(
      `/comments/products/${productId}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
