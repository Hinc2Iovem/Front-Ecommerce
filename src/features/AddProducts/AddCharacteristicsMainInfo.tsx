import { useEffect, useState } from "react";

type AddCharacteristicsMainInfoTypes = {
  setAllSubTitles: React.Dispatch<React.SetStateAction<string[][]>>;
  setAllTexts: React.Dispatch<React.SetStateAction<string[][]>>;
  mainIndex: number;
  subIndex: number;
};

export default function AddCharacteristicsMainInfo({
  setAllSubTitles,
  setAllTexts,
  mainIndex,
  subIndex,
}: AddCharacteristicsMainInfoTypes) {
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setAllSubTitles((prev) => {
      const newSubTitles = [...prev];
      if (!newSubTitles[mainIndex]) {
        newSubTitles[mainIndex] = [];
      }
      newSubTitles[mainIndex][subIndex] = subTitle;
      return newSubTitles;
    });
  }, [mainIndex, subIndex, setAllSubTitles, subTitle]);

  useEffect(() => {
    setAllTexts((prev) => {
      const newTexts = [...prev];
      if (!newTexts[mainIndex]) {
        newTexts[mainIndex] = [];
      }
      newTexts[mainIndex][subIndex] = description;
      return newTexts;
    });
  }, [mainIndex, subIndex, setAllTexts, description]);

  return (
    <>
      <input
        className="w-full outline-neutral-grayish-blue border-neutral-grayish-blue border-[2px] p-[1rem] rounded-md text-gray-600 font-medium focus:border-[3px]"
        id="subTitle"
        placeholder="Sub Title"
        onChange={(e) => setSubTitle(e.target.value)}
        type="text"
        value={subTitle}
      />
      <input
        className="w-full outline-neutral-grayish-blue border-neutral-grayish-blue border-[2px] p-[1rem] rounded-md text-gray-600 font-medium focus:border-[3px]"
        id="description"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        value={description}
      />
    </>
  );
}
