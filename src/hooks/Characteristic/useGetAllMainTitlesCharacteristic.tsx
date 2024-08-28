import { useEffect, useState } from "react";
import { MainTitlesCharacteristicTypes } from "../../types/CharacteristicTypes";
import { getMainTitlesCharacteristics } from "../../api/queries/characteristicQueries";

export default function useGetAllMainTitlesCharacteristic({
  productId,
}: {
  productId: string;
}) {
  const [characteristic, setCharacteristic] = useState<
    MainTitlesCharacteristicTypes[] | []
  >([]);

  useEffect(() => {
    getMainTitlesCharacteristics({ productId }).then((r) => {
      if (r) {
        setCharacteristic(r);
      }
    });
  }, [productId]);
  return characteristic;
}
