import { UserTypes } from "../../types/ProfileTypes";
import { axiosPublic } from "../axios";

export const getUser = async ({ userId }: { userId: string }) => {
  try {
    const res = await axiosPublic.get<UserTypes>(`/users/${userId}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
