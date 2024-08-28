import { CATEGORIES } from "../../../const/PillsCategories";

type RecommendedShowCategoriesTypes = {
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
  currentCategory: string;
};

export default function RecommendedShowCategories({
  currentCategory,
  setCurrentCategory,
}: RecommendedShowCategoriesTypes) {
  return (
    <div className="flex w-full gap-[1rem]">
      {Object.entries(CATEGORIES).map(([key]) => (
        <button
          onClick={() => setCurrentCategory(key)}
          className={`${
            currentCategory === key
              ? " bg-primary-orange text-white"
              : "bg-white"
          } px-[1rem] py-[.5rem] shadow-sm rounded-md hover:bg-primary-orange hover:text-white transition-all`}
          key={key}
        >
          {key}
        </button>
      ))}
    </div>
  );
}
