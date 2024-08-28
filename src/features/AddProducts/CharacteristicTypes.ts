export type ProductCharacteristicsResponse = {
  _id: string;
  productId: string;
  title: string;
};

export type ProductCharacteristicsRequest = {
  title: string;
};

export type ProductSubCharacteristicsResponse = {
  _id: string;
  productCharacteristicId: string;
  subTitle: string;
  text: string;
};

export type ProductSubCharacteristicsRequest = {
  title: string;
  text: string;
};
