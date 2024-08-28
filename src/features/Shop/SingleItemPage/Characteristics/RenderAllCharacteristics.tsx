import { useState } from "react";
import arrowDown from "../../../../assets/images/SingleItemPage/down-arrow.png";
import arrowRight from "../../../../assets/images/SingleItemPage/right-arrow.png";
import RenderAllSubTitlesAndTexts from "./RenderAllSubTitlesAndTexts";
import useGetAllMainInfoCharacteristic from "../../../../hooks/Characteristic/useGetAllMainInfoCharacteristic";

type RenderAllCharacteristicsTypes = {
  mainTitle: string;
  mainTitleId: string;
};

export default function RenderAllCharacteristics({
  mainTitle,
  mainTitleId,
}: RenderAllCharacteristicsTypes) {
  const [hideSubTitle, setHideSubTitle] = useState(false);
  const mainInfo = useGetAllMainInfoCharacteristic({
    productCharacteristicId: mainTitleId,
  });

  return (
    <div className="flex flex-col">
      <div className="relative w-fit">
        <h3 className="text-[2.5rem] font-medium border-l-[2px] pl-[.5rem] border-black w-fit">
          {mainTitle}
        </h3>
        <ShowArrowDownOrRight
          hide={hideSubTitle}
          setHideValue={setHideSubTitle}
        />
      </div>
      {mainInfo &&
        mainInfo.map((st) => (
          <RenderAllSubTitlesAndTexts
            key={st._id}
            hideSubTitle={hideSubTitle}
            subTitle={st.subTitle}
            text={st.text}
          />
        ))}
    </div>
  );
}

type ShowArrowDownOrRightTypes = {
  hide: boolean;
  isSubTitle?: boolean;
  setHideValue: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ShowArrowDownOrRight({
  hide,
  setHideValue,
  isSubTitle = false,
}: ShowArrowDownOrRightTypes) {
  return (
    <>
      {hide ? (
        <button
          onClick={() => setHideValue((prev) => !prev)}
          className={`absolute ${
            isSubTitle
              ? "right-[-1.5rem] top-[1rem]"
              : "right-[-2.3rem] top-[.9rem]"
          } hover:scale-[1.01] active:scale-[0.99]`}
        >
          <img
            src={arrowDown}
            alt={hide ? "Show Text" : "Hide Text"}
            className={`${isSubTitle ? "w-[1.2rem]" : "w-[2rem]"}`}
          />
        </button>
      ) : (
        <button
          onClick={() => setHideValue((prev) => !prev)}
          className={`absolute ${
            isSubTitle
              ? "right-[-1.5rem] top-[1rem]"
              : "right-[-2.3rem] top-[.9rem]"
          } hover:scale-[1.01] active:scale-[0.99]`}
        >
          <img
            src={arrowRight}
            alt={hide ? "Show Text" : "Hide Text"}
            className={`${isSubTitle ? "w-[1.2rem]" : "w-[2rem]"}`}
          />
        </button>
      )}
    </>
  );
}
