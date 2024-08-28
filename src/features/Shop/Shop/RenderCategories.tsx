import { CATEGORIES } from "../../../const/PillsCategories";
import EachCategory from "./EachCategory";

type RenderCategoriesTypes = {
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
  currentCategory: string;
  setSubCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
  subCurrentCategory: string;
};

export default function RenderCategories({
  setIsClicked,
  setCurrentCategory,
  currentCategory,
  setSubCurrentCategory,
  subCurrentCategory,
}: RenderCategoriesTypes) {
  return (
    <div
      className={`md:flex max-w-[31rem] hidden md:row-span-12 bg-white h-fit flex-col gap-[1rem] p-[1.5rem] rounded-lg shadow-sm sticky top-[90px] shrink-0 min-w-[30rem]`}
    >
      {Object.entries(CATEGORIES).map(
        ([key, value]: [string, string | Record<string, string>]) => {
          if (typeof value === "object") {
            return (
              <EachCategory
                key={key}
                k={key}
                value={value}
                currentCategory={currentCategory}
                setCurrentCategory={setCurrentCategory}
                setIsClicked={setIsClicked}
                setSubCurrentCategory={setSubCurrentCategory}
                subCurrentCategory={subCurrentCategory}
              />
            );
          } else {
            return (
              <button
                key={key}
                onClick={() => {
                  setIsClicked((prev) => !prev);
                  setCurrentCategory(key);
                }}
                className={`${
                  key === currentCategory
                    ? "bg-primary-orange text-white p-[1rem]"
                    : ""
                } hover:opacity-90 flex font-medium items-center gap-[.4rem] transition-all rounded-lg hover:p-[1rem] hover:bg-primary-orange hover:text-white`}
              >
                {key}
              </button>
            );
          }
        }
      )}
    </div>
  );
}
