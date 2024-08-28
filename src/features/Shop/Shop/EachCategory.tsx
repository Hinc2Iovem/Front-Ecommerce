type EachCategoryTypes = {
  k: string;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
  setSubCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
  currentCategory: string;
  value: Record<string, string>;
  subCurrentCategory: string;
};

export default function EachCategory({
  k,
  setIsClicked,
  setCurrentCategory,
  setSubCurrentCategory,
  currentCategory,
  value,
  subCurrentCategory,
}: EachCategoryTypes) {
  return (
    <div>
      <button
        onClick={() => {
          setIsClicked((prev) => !prev);
          setCurrentCategory(k);
          setSubCurrentCategory("");
        }}
        className={`${
          k === currentCategory ? "bg-primary-orange text-white p-[1rem]" : ""
        } hover:opacity-90 flex font-medium items-center gap-[.4rem] transition-all rounded-lg hover:p-[1rem] hover:bg-primary-orange hover:text-white w-full`}
      >
        {k}
      </button>
      <ul
        className={`${
          k === currentCategory ? "" : "hidden"
        } flex flex-col gap-[.5rem] ml-[.5rem]`}
      >
        {Object.entries(value).map(([subK]) => {
          return (
            <li key={subK}>
              <button
                onClick={() => {
                  setIsClicked((prev) => !prev);
                  setSubCurrentCategory(subK);
                }}
                className={`${
                  subK === subCurrentCategory
                    ? "text-black p-[1rem] border-b-[2px] border-black"
                    : "p-[.5rem] text-gray-700 hover:p-[.7rem] "
                } flex font-medium items-center gap-[.4rem] transition-all rounded-sm w-full`}
              >
                {subK}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
