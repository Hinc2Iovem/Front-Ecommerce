import {
  RecommendedProductsAmountTypes,
  RecommendedProductsTypes,
} from "../../types/RecommendedProducts";
import { axiosPublic } from "../axios";

type RecommendedProductsAmountProps = {
  productId: string;
};

export const getRecommendedSellerProductsAmount = async ({
  productId,
}: RecommendedProductsAmountProps) => {
  try {
    return await axiosPublic
      .get<RecommendedProductsAmountTypes>(
        `/recommendedProductsAmount/products/${productId}`
      )
      .then((r) => r.data);
  } catch (error) {
    console.error(error);
  }
};

type GetRecommendedProductsTypes = {
  productId: string;
};

export const getRecommendedProducts = async ({
  productId,
}: GetRecommendedProductsTypes) => {
  try {
    return await axiosPublic
      .get<RecommendedProductsTypes[]>(
        `/recommendedProducts/products/${productId}`
      )
      .then((r) => r.data);
  } catch (error) {
    console.error(error);
  }
};

type GetSingleRecommendedProductsTypes = {
  recommendedProductId: string;
  productId: string;
};

export const getSingleRecommendedProducts = async ({
  recommendedProductId,
  productId,
}: GetSingleRecommendedProductsTypes) => {
  try {
    const data = await axiosPublic
      .get<RecommendedProductsTypes>(
        `/recommendedProducts/${recommendedProductId}/products/${productId}`
      )
      .then((r) => r.data);

    return data;
  } catch (error) {
    console.error(error);
  }
};
