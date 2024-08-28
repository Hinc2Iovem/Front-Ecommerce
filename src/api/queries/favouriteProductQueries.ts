import { axiosPublic } from "../axios";

type GetFavouriteTypes = {
  userId: string;
};

export const getAllFavouriteProducts = async ({
  userId,
}: GetFavouriteTypes) => {
  try {
    const products = await axiosPublic.get(`/favourite/users/${userId}`);
    return products.data;
  } catch (error) {
    console.error(error);
  }
};
