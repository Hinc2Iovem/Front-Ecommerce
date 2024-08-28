import RenderAllCharacteristicsShowCase from "./RenderAllCharacteristicsShowCase";

type SingleItemCharacteristicsTypes = {
  showAdditionalInformation: "characteristics" | "sellerProducts" | string;
  allMainTitles: string[];
  allSubTitles: string[][];
  allTexts: string[][];
};

export default function SingleItemCharacteristicsShowCase({
  showAdditionalInformation,
  allMainTitles,
  allSubTitles,
  allTexts,
}: SingleItemCharacteristicsTypes) {
  const renderCharacteristicsItems = () => {
    return allMainTitles.map((mainTitle, index) => {
      const subTitlesThisMainTitle = allSubTitles[index];
      const textsThisMainTitle = allTexts[index];

      return (
        <RenderAllCharacteristicsShowCase
          key={index}
          mainTitle={mainTitle}
          subTitlesForThisMainTitle={subTitlesThisMainTitle}
          textsForThisMainTitle={textsThisMainTitle}
        />
      );
    });
  };
  return (
    <div
      className={`${
        showAdditionalInformation === "characteristics" ? "" : "hidden"
      } flex flex-col h-full gap-7 w-full text-start mt-[2rem]`}
    >
      {renderCharacteristicsItems()}
    </div>
  );
}
