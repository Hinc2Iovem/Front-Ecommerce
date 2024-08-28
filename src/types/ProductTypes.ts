export type ProductTypes = {
  _id: string;
  title: string;
  description: string;
  rating: number;
  imgUrls: string[];
  category: string;
  brand: string;
  userId: string;
  price: string;
  isAvailable: boolean;
  isActive: boolean;
  frontImg: string;
  amountOfReports: number;
  amountOfRatings: number;
  subCategory: string;
};

export type ProductBody = {
  title: string;
  description: string;
  imgUrls: string[];
  category: string;
  brand: string;
  price: string;
  frontImg: string;
  subCategory: string;
};
