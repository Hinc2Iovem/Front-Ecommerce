import { CATEGORIES_FOR_CREATING_PRODUCTS } from "../../const/PillsCategories";
import RenderSingleCategory from "./RenderSingleCategory";

type AddProductCategoriesTypes = {
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
  currentCategory: string;
  setSubCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
  subCurrentCategory: string;
};

export default function AddProductCategories({
  setCurrentCategory,
  currentCategory,
  setSubCurrentCategory,
  subCurrentCategory,
}: AddProductCategoriesTypes) {
  return (
    <div className="w-full flex flex-wrap gap-[.5rem]">
      {Object.entries(CATEGORIES_FOR_CREATING_PRODUCTS).map(
        ([key, value]: [string, string | Record<string, string>]) => {
          if (typeof value === "object") {
            return (
              <RenderSingleCategory
                key={key}
                subCurrentCategory={subCurrentCategory}
                k={key}
                value={value}
                currentCategory={currentCategory}
                setCurrentCategory={setCurrentCategory}
                setSubCurrentCategory={setSubCurrentCategory}
              />
            );
          } else {
            return (
              <button
                type="button"
                key={key}
                onClick={() => {
                  setCurrentCategory(key);
                  setSubCurrentCategory("");
                }}
                className={`${
                  key === currentCategory
                    ? "bg-green-400 hover:opacity-100 text-white"
                    : "bg-white hover:bg-green-300"
                } hover:translate-x-1 shadow-sm shadow-neutral-grayish-blue flex font-medium items-center gap-[.4rem] transition-all rounded-lg p-[1rem] hover:text-white`}
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
