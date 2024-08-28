import { useEffect, useState } from "react";
import arrowDown from "../../assets/images/SingleItemPage/down-arrow.png";
import arrowRight from "../../assets/images/SingleItemPage/right-arrow.png";
import plus from "../../assets/images/shared/plus.png";
import AddCharacteristicsMainInfo from "./AddCharacteristicsMainInfo";

type AddCharacteristicsMainTitleTypes = {
  setAllSubTitles: React.Dispatch<React.SetStateAction<string[][]>>;
  setAllTexts: React.Dispatch<React.SetStateAction<string[][]>>;
  setAllMainTitles: React.Dispatch<React.SetStateAction<string[]>>;
  setAmountOfMainInfoAll: React.Dispatch<React.SetStateAction<number[]>>;
  mainIndex: number;
};
export default function AddCharacteristicsMainTitle({
  setAllSubTitles,
  setAllTexts,
  setAllMainTitles,
  setAmountOfMainInfoAll,
  mainIndex,
}: AddCharacteristicsMainTitleTypes) {
  const [mainTitle, setMainTitle] = useState("");
  const [hideBlock, setHideBLock] = useState(false);
  const [amountOfMainInfo, setAmountOfMainInfo] = useState(1);

  const renderMainInfoItems = () => {
    const items = [];
    for (let i = 0; i < amountOfMainInfo; i++) {
      items.push(
        <AddCharacteristicsMainInfo
          mainIndex={mainIndex}
          subIndex={i}
          setAllSubTitles={setAllSubTitles}
          setAllTexts={setAllTexts}
          key={i}
        />
      );
    }
    return items;
  };

  useEffect(() => {
    setAllMainTitles((prev) => {
      const newTitles = [...prev];
      newTitles[mainIndex] = mainTitle;
      return newTitles;
    });
  }, [mainTitle, setAllMainTitles, mainIndex]);

  return (
    <div className={`relative flex flex-col`}>
      <div className=" px-[1rem] pt-[3rem] pb-[1rem] bg-white relative w-full shadow-md shadow-gray-600 rounded-tr-md">
        <button
          type="button"
          onClick={() => setHideBLock((prev) => !prev)}
          className="absolute top-[.5rem] right-[.5rem] z-[11]"
        >
          <img
            src={hideBlock ? arrowRight : arrowDown}
            alt={hideBlock ? "Show" : "Hide"}
            className="w-[1.5rem] h-[1.5rem]"
          />
        </button>
        <input
          className="w-full bg-white outline-neutral-grayish-blue border-neutral-grayish-blue border-[2px] p-[1rem] rounded-md text-gray-600 font-medium focus:border-[3px]"
          id="mainTitle"
          placeholder="Main Title"
          onChange={(e) => setMainTitle(e.target.value)}
          type="text"
          value={mainTitle}
        />
        <button
          type="button"
          className="absolute z-[10] top-[7rem] left-[0rem] hover:scale-[1.01] active:scale-[0.99]"
          onClick={() => {
            setAmountOfMainInfo((prev) => (prev += 1));
            setAmountOfMainInfoAll((prev) => {
              const allAmount = [...prev];
              allAmount[mainIndex] += 1;
              return allAmount;
            });
          }}
        >
          <img src={plus} alt="plus" className="w-[2.5rem] h-[2.5rem]" />
        </button>
      </div>
      <div
        className={` ${
          hideBlock ? "h-[0rem] overflow-hidden p-0" : "h-fit"
        } transition-all relative w-full`}
      >
        <div className="z-[9] flex flex-col gap-[2rem] px-[1rem] pt-[1rem] pb-[1rem] bg-white">
          {renderMainInfoItems()}
        </div>
      </div>
    </div>
  );
}
