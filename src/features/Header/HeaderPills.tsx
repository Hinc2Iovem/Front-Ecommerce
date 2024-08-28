import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES } from "../../const/PillsCategories";

const TRANSLATE_AMOUNT = 200;

type HeaderPillsProps = {
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
  currentCategory: string;
  setIsClicked?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HeaderPills({
  currentCategory,
  setCurrentCategory,
  setIsClicked,
}: HeaderPillsProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const pillsRef = useRef<HTMLDivElement | null>(null);

  const [translate, setTranslate] = useState(0);
  const [isRightVisible, setIsRightVisible] = useState(false);
  const [isLeftVisible, setIsLeftVisible] = useState(false);

  useEffect(() => {
    if (containerRef.current == null) return;

    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;

      if (pillsRef.current) {
        if (container.clientWidth > pillsRef.current.offsetWidth) {
          setTranslate(0);
        }
      }

      setIsLeftVisible(translate > 0);
      setIsRightVisible(
        translate + container.clientWidth < container.scrollWidth
      );
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [translate]);

  return (
    <nav
      className="p-5 overflow-x-hidden relative bg-white md:shadow-md shadow-black"
      ref={containerRef}
    >
      <div
        ref={pillsRef}
        style={{ transform: `translateX(-${translate}px)` }}
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
      >
        {Object.keys(CATEGORIES).map((key) => (
          <button
            className={`${
              currentCategory === key
                ? "bg-primary-orange hover:bg-primary-orange text-white"
                : "bg-white"
            } shadow-md shadow-neutral-grayish-blue p-3 rounded-lg hover:bg-orange-300 hover:text-white transition-all hover:translate-x-1`}
            key={key}
            onClick={() => {
              if (setIsClicked) {
                setIsClicked((prev) => !prev);
              }
              setCurrentCategory(key);
            }}
          >
            {key}
          </button>
        ))}
      </div>

      {isLeftVisible && (
        <div className="absolute z-10 top-1/2 left-0 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <button
            className="h-full aspect-square w-auto p-1.5 rounded-full"
            onClick={() =>
              setTranslate((t) => {
                const newTranslate = t - TRANSLATE_AMOUNT;
                if (newTranslate <= 0) {
                  return 0;
                } else {
                  return newTranslate;
                }
              })
            }
          >
            <ChevronLeft />
          </button>
        </div>
      )}
      {isRightVisible && (
        <div className="absolute z-10 top-1/2 right-0 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full justify-end">
          <button
            className="h-full aspect-square w-auto p-1.5 rounded-full"
            onClick={() =>
              setTranslate((t) => {
                if (containerRef.current == null) return t;
                const newTranslate = t + TRANSLATE_AMOUNT;
                const edge = containerRef.current.scrollWidth;
                const width = containerRef.current.clientWidth;
                if (newTranslate + width >= edge) {
                  return edge - width;
                } else {
                  return newTranslate;
                }
              })
            }
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </nav>
  );
}
