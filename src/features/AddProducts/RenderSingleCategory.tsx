import { useRef, useState } from "react";
import useOutOfModal from "../../hooks/UI/useOutOfModal";

type RenderSingleCategoryTypes = {
  k: string;
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
  setSubCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
  currentCategory: string;
  value: Record<string, string>;
  subCurrentCategory: string;
};

export default function RenderSingleCategory({
  value,
  k,
  subCurrentCategory,
  currentCategory,
  setCurrentCategory,
  setSubCurrentCategory,
}: RenderSingleCategoryTypes) {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  useOutOfModal({
    modalRef: modalRef,
    setShowModal,
    showModal,
  });
  return (
    <div ref={modalRef} className="relative">
      <button
        type="button"
        onClick={() => {
          setCurrentCategory(k);
          setShowModal(true);
          if (
            !Object.entries(value).find(([subK]) => subK === subCurrentCategory)
          ) {
            setSubCurrentCategory("");
          }
        }}
        className={`${
          k === currentCategory
            ? "bg-green-400 hover:opacity-100 text-white"
            : "bg-white hover:bg-green-300"
        } whitespace-nowrap self-center outline-white p-[1rem] shadow-sm shadow-neutral-grayish-blue hover:translate-x-1 active:scale-[.97] hover:opacity-90 flex font-medium items-center gap-[.4rem] transition-all rounded-lg hover:text-white`}
      >
        {k}
      </button>
      <ul
        className={`${
          k === currentCategory && showModal ? "" : "hidden"
        } flex flex-col gap-[.5rem] ml-[.5rem] absolute z-[10] bg-white mt-[.5rem] shadow-md shadow-gray-600 max-h-[20rem] overflow-y-auto`}
      >
        {Object.entries(value).map(([subK]) => {
          return (
            <li className="relative overflow-hidden" key={subK}>
              <button
                type="button"
                onClick={() => {
                  setSubCurrentCategory(subK);
                }}
                className={`${
                  subK === subCurrentCategory ? "ml-[.5rem]" : ""
                } p-[1rem] flex font-medium items-center gap-[.4rem] transition-all rounded-lg w-full`}
              >
                {subK}
              </button>
              <div
                className={`${
                  subK === subCurrentCategory
                    ? "w-[1rem] h-[1rem] rounded-full bg-green-500 left-[.3rem] top-[calc(50%-.5rem)]"
                    : " "
                } absolute`}
              ></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
