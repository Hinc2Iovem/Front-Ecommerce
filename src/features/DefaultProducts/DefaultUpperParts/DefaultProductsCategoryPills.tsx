import { useState } from "react";
import { CATEGORIES_FOR_CREATING_PRODUCTS } from "../../../const/PillsCategories";
import useMatchMedia from "../../../hooks/UI/useMatchMedia";
import { MATCHMEDIA } from "../../../const/MatchMedia";

type DefaultProductsCategoryPillsTypes = {
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
  currentCategory: string;
  currentSubCategory: string;
  setCurrentSubCategory: React.Dispatch<React.SetStateAction<string>>;
  lockCategories: boolean;
};

export default function DefaultProductsCategoryPills({
  currentCategory,
  currentSubCategory,
  setCurrentCategory,
  setCurrentSubCategory,
  lockCategories,
}: DefaultProductsCategoryPillsTypes) {
  const [showModal, setShowModal] = useState(false);
  const [openedByClick, setOpenedByClick] = useState(false);
  const mobile = useMatchMedia(MATCHMEDIA.Mobile);

  return (
    <div className="flex items-center gap-[1.5rem]">
      {Object.entries(CATEGORIES_FOR_CREATING_PRODUCTS).map(([key, value]) => (
        <div
          onClick={() => {
            if (mobile) {
              if (showModal) {
                setShowModal(false);
              } else {
                setCurrentCategory(key);
                setShowModal(true);
              }
              setOpenedByClick(true);
            }
          }}
          onMouseOver={() => {
            if (!lockCategories) {
              setCurrentCategory(key);
              setShowModal(true);
            }
          }}
          onMouseOut={() => {
            if (!openedByClick) {
              setShowModal(false);
            }
          }}
          key={key}
        >
          <button
            className={` ${
              currentCategory === key
                ? " bg-primary-orange text-white"
                : "bg-white"
            } px-[1rem] py-[.5rem] rounded-md shadow-sm hover:scale-[1.01] sm:cursor-default`}
          >
            {key}
          </button>
          {typeof value === "object" && (
            <div
              className={` ${
                showModal && key === currentCategory ? "" : "hidden"
              }  absolute  z-[1]`}
            >
              <ul
                className={`flex flex-col gap-[1rem] bg-white p-[1rem] mt-[.3rem] shadow-lg rounded-md`}
              >
                {Object.values(value).map((v) => (
                  <li
                    key={v}
                    className={`${
                      currentSubCategory === v ? "bg-green-300 text-white" : ""
                    } transition-all p-[.5rem] rounded-md cursor-default`}
                    onMouseOver={() => setCurrentSubCategory(v)}
                    onClick={() => setOpenedByClick(false)}
                  >
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
