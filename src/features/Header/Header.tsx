import { useRef, useState } from "react";
import BurgerMenu from "./BurgerMenu";
import HeaderPills from "./HeaderPills";
import HeaderSearch from "./HeaderSearch";

type HeaderTypes = {
  currentCategory?: string;
  setCurrentCategory?: React.Dispatch<React.SetStateAction<string>>;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  showPillsOrNot?: boolean;
  setIsClicked?: React.Dispatch<React.SetStateAction<boolean>>;
  productAddedToCart?: boolean;
  productRemovedFromCart?: boolean;
  removedProductId?: string;
  removedProductPrice?: number;
};

export default function Header({
  currentCategory = "All",
  setCurrentCategory = () => {},
  showPillsOrNot = true,
  setIsClicked,
  setValue,
  productAddedToCart,
  productRemovedFromCart,
  removedProductId,
  removedProductPrice,
}: HeaderTypes) {
  const [expandBurgerMenu, setExpandBurgerMenu] = useState(false);
  const secondModalRef = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <header className={`sticky bg-white w-full top-0 z-[2]`}>
        <HeaderSearch
          removedProductPrice={removedProductPrice}
          setValue={setValue}
          productAddedToCart={productAddedToCart}
          setExpandBurgerMenu={setExpandBurgerMenu}
          secondModalRef={secondModalRef}
          productRemovedFromCart={productRemovedFromCart}
          removedProductId={removedProductId}
        />
        <div
          className={`block md:hidden ${showPillsOrNot ? "block" : "hidden"}`}
        >
          <HeaderPills
            setCurrentCategory={setCurrentCategory}
            currentCategory={currentCategory}
            setIsClicked={setIsClicked}
          />
        </div>
      </header>
      <BurgerMenu
        setExpandBurgerMenu={setExpandBurgerMenu}
        expandBurgerMenu={expandBurgerMenu}
        secondModalRef={secondModalRef}
      />
    </>
  );
}
