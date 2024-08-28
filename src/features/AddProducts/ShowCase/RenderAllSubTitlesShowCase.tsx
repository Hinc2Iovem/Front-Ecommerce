import { useState } from "react";
import { ShowArrowDownOrRight } from "../../Shop/SingleItemPage/Characteristics/RenderAllCharacteristics";

type RenderAllSubTitlesAndTextsShowCaseTypes = {
  hideSubTitle: boolean;
  subTitle: string;
  text: string;
};

export default function RenderAllSubTitlesAndTextsShowCase({
  hideSubTitle,
  subTitle,
  text,
}: RenderAllSubTitlesAndTextsShowCaseTypes) {
  const [hideText, setHideText] = useState(false);

  return (
    <div>
      <div className={`${hideSubTitle ? "hidden" : ""} relative w-fit`}>
        <h5
          className={`text-[2rem] border-l-[2px] ml-[.5rem] pl-[.5rem] border-black w-fit`}
        >
          {subTitle}
        </h5>
        <ShowArrowDownOrRight
          isSubTitle={true}
          hide={hideText}
          setHideValue={setHideText}
        />
      </div>
      <p
        className={`text-gray-700 ${
          hideText || hideSubTitle ? "hidden" : ""
        }  pl-[1.5rem] w-full`}
      >
        {text}
      </p>
    </div>
  );
}
