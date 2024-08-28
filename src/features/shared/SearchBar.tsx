import { Search } from "lucide-react";

type SearchBarTypes = {
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchBar({ setValue }: SearchBarTypes) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex justify-center h-[5rem] items-center w-full border-[1px] relative bg-white rounded-lg"
    >
      <input
        onChange={(e) => setValue(e.target.value)}
        className="border-primary-pastel-blue w-full outline-none border-[3px] border-dotted bg-transparent rounded-lg py-[1.15rem] px-[1rem] font-bold text-neutral-dark-grayish-blue"
      />
      <button
        type="button"
        className="hover:z-[3] hover:scale-[1.1] cursor-pointer absolute right-[3rem]"
      >
        <Search className="text-primary-pastel-blue" />
      </button>
    </form>
  );
}
