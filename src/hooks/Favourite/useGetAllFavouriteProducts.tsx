import { useEffect, useState } from "react";
import { FavouriteTypes } from "../../types/FavouriteTypes";
import { getAllFavouriteProducts } from "../../api/queries/favouriteProductQueries";

export default function useGetAllFavouriteProducts({
  userId,
}: {
  userId: string;
}) {
  const [favouriteProducts, setFavouriteProducts] = useState<
    FavouriteTypes[] | []
  >([]);

  useEffect(() => {
    getAllFavouriteProducts({ userId }).then((r) => setFavouriteProducts(r));
  }, [userId]);

  return favouriteProducts;
}
