import { useEffect, useState } from "react";
import { MainInfoCharacteristicTypes } from "../../types/CharacteristicTypes";
import { getMainInfoCharacteristics } from "../../api/queries/characteristicQueries";

export default function useGetAllMainInfoCharacteristic({
  productCharacteristicId,
}: {
  productCharacteristicId: string;
}) {
  const [characteristic, setCharacteristic] = useState<
    MainInfoCharacteristicTypes[] | []
  >([]);

  useEffect(() => {
    getMainInfoCharacteristics({ productCharacteristicId }).then((r) => {
      if (r) {
        setCharacteristic(r);
      }
    });
  }, [productCharacteristicId]);
  return characteristic;
}
