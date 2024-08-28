type DefaultChosenCategoriesTypes = {
  currentCategory: string;
  currentSubCategory: string;
  setLockCategories: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DefaultChosenCategories({
  currentCategory,
  currentSubCategory,
  setLockCategories,
}: DefaultChosenCategoriesTypes) {
  return (
    <ul
      className={`${
        currentCategory ? "" : "hidden"
      } flex gap-[1rem] items-center`}
    >
      <li className="px-[1rem] py-[.5rem] rounded-md shadow-sm hover:scale-[1.01] bg-white">
        {currentCategory}
      </li>
      <li
        className={`${
          currentSubCategory ? "" : "hidden"
        } px-[1rem] py-[.5rem] rounded-md shadow-sm hover:scale-[1.01] bg-white`}
      >
        {currentSubCategory}
      </li>
      <form
        className={`${
          currentSubCategory && currentCategory
            ? "sm:flex items-center gap-[.5rem] hidden"
            : "hidden"
        } `}
        noValidate
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="lock">Lock Categories</label>
        <input
          id="lock"
          className="cursor-pointer"
          type="checkbox"
          onChange={() => setLockCategories((prev) => !prev)}
        />
      </form>
    </ul>
  );
}
