import { ProductTypes } from "../../types/ProductTypes";
import { axiosPublic } from "../axios";

export const getAllProducts = async () => {
  const path = `/products`;
  const products = await axiosPublic.get(path);
  return products.data;
};

type GetProductTypes = {
  productId: string;
};

export const getProductById = async ({ productId }: GetProductTypes) => {
  try {
    const data = await axiosPublic.get<ProductTypes>(`/products/${productId}`);
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductsByUserId = async ({ userId }: { userId: string }) => {
  try {
    const res = await axiosPublic.get<ProductTypes[]>(
      `/products/users/${userId}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getBoughtProductsByUserId = async ({
  userId,
}: {
  userId: string;
}) => {
  try {
    const res = await axiosPublic.get<ProductTypes[]>(
      `/boughtProducts/users/${userId}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSoldProductsByUserId = async ({
  userId,
}: {
  userId: string;
}) => {
  try {
    const res = await axiosPublic.get<ProductTypes[]>(
      `/soldProducts/users/${userId}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
