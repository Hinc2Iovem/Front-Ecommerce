import { useState } from "react";
import { ShowArrowDownOrRight } from "../../Shop/SingleItemPage/Characteristics/RenderAllCharacteristics";
import RenderAllSubTitlesAndTextsShowCase from "./RenderAllSubTitlesShowCase";

type RenderAllCharacteristicsShowCaseTypes = {
  mainTitle: string;
  subTitlesForThisMainTitle: string[];
  textsForThisMainTitle: string[];
};

export default function RenderAllCharacteristicsShowCase({
  mainTitle,
  subTitlesForThisMainTitle,
  textsForThisMainTitle,
}: RenderAllCharacteristicsShowCaseTypes) {
  const [hideSubTitle, setHideSubTitle] = useState(false);

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
      {subTitlesForThisMainTitle?.map((st, index) => (
        <RenderAllSubTitlesAndTextsShowCase
          key={st + index}
          hideSubTitle={hideSubTitle}
          subTitle={st}
          text={textsForThisMainTitle[index]}
        />
      ))}
    </div>
  );
}

// export type ShowArrowDownOrRightTypes = {
//   hide: boolean;
//   setHideValue: React.Dispatch<React.SetStateAction<boolean>>;
// };

// export function ShowArrowDownOrRight({
//   hide,
//   setHideValue,
// }: ShowArrowDownOrRightTypes) {
//   return (
//     <>
//       {hide ? (
//         <button
//           onClick={() => setHideValue((prev) => !prev)}
//           className="absolute right-[-2.5rem] top-[.5rem] hover:scale-[1.01] active:scale-[0.99]"
//         >
//           <img
//             src={arrowDown}
//             alt={hide ? "Show Text" : "Hide Text"}
//             className=" w-[2rem] "
//           />
//         </button>
//       ) : (
//         <button
//           onClick={() => setHideValue((prev) => !prev)}
//           className="absolute right-[-2.5rem] top-[.5rem] hover:scale-[1.01] active:scale-[0.99]"
//         >
//           <img
//             src={arrowRight}
//             alt={hide ? "Show Text" : "Hide Text"}
//             className=" w-[2rem] "
//           />
//         </button>
//       )}
//     </>
//   );
// }
