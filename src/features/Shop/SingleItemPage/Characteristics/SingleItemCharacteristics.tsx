import useGetAllMainTitlesCharacteristic from "../../../../hooks/Characteristic/useGetAllMainTitlesCharacteristic";
import RenderAllCharacteristics from "./RenderAllCharacteristics";

type SingleItemCharacteristicsTypes = {
  showAdditionalInformation: string;
  productId: string;
};

export default function SingleItemCharacteristics({
  showAdditionalInformation,
  productId,
}: SingleItemCharacteristicsTypes) {
  const mainTitles = useGetAllMainTitlesCharacteristic({
    productId,
  });

  return (
    <div
      className={`${
        showAdditionalInformation === "characteristics" ? "" : "hidden"
      } flex flex-col h-full gap-[4rem] w-full text-start mt-[2rem]`}
    >
      {mainTitles.map((mt) => (
        <RenderAllCharacteristics
          key={mt._id}
          mainTitle={mt.title}
          mainTitleId={mt._id}
        />
      ))}
    </div>
  );
}
