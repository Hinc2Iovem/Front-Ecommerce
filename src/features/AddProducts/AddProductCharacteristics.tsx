import { useState } from "react";
import AddCharacteristicsMainTitle from "./AddCharacteristicsMainTitle";
import plus from "../../assets/images/shared/plus.png";
import ClipLoad from "../shared/Miscellaneous/Loaders/ClipLoad";

export type AddProductCharacteristicsTypes = {
  setAllSubTitles: React.Dispatch<React.SetStateAction<string[][]>>;
  setAllTexts: React.Dispatch<React.SetStateAction<string[][]>>;
  setAllMainTitles: React.Dispatch<React.SetStateAction<string[]>>;
  setAmountOfMainInfoAll: React.Dispatch<React.SetStateAction<number[]>>;
  setAmountOfMainTitles: React.Dispatch<React.SetStateAction<number>>;
  loading: {
    frontImg: boolean;
    imgs: boolean;
    form: boolean;
    characteristics: boolean;
  };
  submitionStarted: boolean;
};
export default function AddProductCharacteristics({
  setAllSubTitles,
  setAllTexts,
  setAllMainTitles,
  setAmountOfMainInfoAll,
  setAmountOfMainTitles,
  loading,
  submitionStarted,
}: AddProductCharacteristicsTypes) {
  const [amountOfCharacteristics, setAmountOfCharacteristics] = useState(1);

  const renderCharacteristicsItems = () => {
    const items = [];
    for (let i = 0; i < amountOfCharacteristics; i++) {
      items.push(
        <AddCharacteristicsMainTitle
          key={i}
          mainIndex={i}
          setAllSubTitles={setAllSubTitles}
          setAllTexts={setAllTexts}
          setAllMainTitles={setAllMainTitles}
          setAmountOfMainInfoAll={setAmountOfMainInfoAll}
        />
      );
    }
    return items;
  };
  return (
    <>
      <div className="w-full flex items-center gap-[.5rem]">
        <h2 className="bg-green-400 text-white text-[2rem] p-[.5rem] rounded-md shadow-md">
          Characteristics
        </h2>
        <button
          type="button"
          className="hover:scale-[1.01] active:scale-[0.99] transition-all"
          onClick={() => {
            setAmountOfCharacteristics((prev) => prev + 1);
            setAmountOfMainTitles((prev) => prev + 1);
            setAmountOfMainInfoAll((prev) => [...prev, 1]);
            setAllSubTitles((prev) => [...prev, []]);
            setAllTexts((prev) => [...prev, []]);
          }}
        >
          <img src={plus} alt="plus" className="w-[3rem] h-[3rem]" />
        </button>
      </div>
      <div className="w-full rounded-md flex flex-col gap-[2rem] relative">
        <ClipLoad
          className={`${
            loading.form
              ? "top-[.3rem] left-[.1rem]"
              : "top-[0rem] left-[.1rem]"
          } z-[100]`}
          conditionToLoading={loading.characteristics}
          conditionToStart={submitionStarted}
        />
        {renderCharacteristicsItems()}
      </div>
    </>
  );
}
