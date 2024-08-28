import { axiosPrivate } from "../axios";

export const Logout = async () => {
  try {
    await axiosPrivate.post(`/auth/logout`);
  } catch (error) {
    console.error(error);
  }
};
