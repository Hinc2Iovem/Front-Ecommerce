import {
  MainInfoCharacteristicTypes,
  MainTitlesCharacteristicTypes,
} from "../../types/CharacteristicTypes";
import { axiosPublic } from "../axios";

export const getMainTitlesCharacteristics = async ({
  productId,
}: {
  productId: string;
}) => {
  try {
    const res = await axiosPublic.get<MainTitlesCharacteristicTypes[]>(
      `/productCharacteristics/products/${productId}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMainInfoCharacteristics = async ({
  productCharacteristicId,
}: {
  productCharacteristicId: string;
}) => {
  try {
    const res = await axiosPublic.get<MainInfoCharacteristicTypes[]>(
      `/productSubCharacteristics/productCharacteristics/${productCharacteristicId}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
