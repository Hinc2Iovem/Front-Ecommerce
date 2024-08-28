import { useEffect, useMemo, useRef, useState } from "react";
import noSuchProductImg from "../../../assets/images/shared/noProduct.png";
import { CATEGORIES } from "../../../const/PillsCategories";
import useGetProducts from "../../../hooks/Products/useGetProducts";
import useDebounce from "../../../hooks/utilities/useDebounce";
import { ProductTypes } from "../../../types/ProductTypes";
import Header from "../../Header/Header";
import InformativeModal, {
  InformativeModalTypes,
} from "../../shared/Modal/InformativeModal";
import RenderCategories from "./RenderCategories";
import ShopItemPreload from "./ShopItemPreload";
import SingleItem from "./SingleItem";

export default function Shop() {
  const [informativeModalType, setInformativeModalType] =
    useState<InformativeModalTypes>("success");
  const [informativeModalMessage, setInformativeModalMessage] = useState("");
  const [showInformativeModal, setShowInformativeModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState(CATEGORIES.All);
  const [subCategory, setSubCategory] = useState("");
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce({ value, delay: 500 });
  const [isClicked, setIsClicked] = useState(false);
  const products = useGetProducts();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [productAddedToCart, setProductAddedToCart] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  const productsToDisplay = useMemo(() => {
    let filtered: ProductTypes[] = products;
    if (currentCategory && currentCategory !== "All") {
      filtered = filtered.filter((p) =>
        p.category.toLowerCase().includes(currentCategory.toLowerCase())
      );
      if (subCategory) {
        filtered = filtered.filter((p) =>
          p.subCategory.toLowerCase().includes(subCategory.toLowerCase())
        );
      }
    }
    if (debouncedValue) {
      filtered = filtered.filter(
        (p) =>
          p.title
            .trim()
            .toLowerCase()
            .includes(debouncedValue.trim().toLowerCase()) ||
          p.description
            .trim()
            .toLowerCase()
            .includes(debouncedValue.trim().toLowerCase())
      );
    }
    setLoading(false);
    return filtered;
  }, [products, currentCategory, subCategory, debouncedValue]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [isClicked]);

  return (
    <>
      <section ref={scrollRef}>
        <Header
          setValue={setValue}
          currentCategory={currentCategory}
          setIsClicked={setIsClicked}
          setCurrentCategory={setCurrentCategory}
          productAddedToCart={productAddedToCart}
        />
        <div className="md:flex">
          <RenderCategories
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            setIsClicked={setIsClicked}
            setSubCurrentCategory={setSubCategory}
            subCurrentCategory={subCategory}
          />
          <div
            className={`${
              productsToDisplay.length
                ? "grid grid-cols-[repeat(auto-fill,minmax(28rem,1fr))] p-3 gap-3 justify-center items-center mb-[2rem]"
                : ""
            }  bg-neutral-magnolia w-full`}
          >
            {productsToDisplay.length ? (
              productsToDisplay.map((p) => (
                <SingleItem
                  key={p._id}
                  setInformativeModalMessage={setInformativeModalMessage}
                  setInformativeModalType={setInformativeModalType}
                  setShowInformativeModal={setShowInformativeModal}
                  setProductAddedToCart={setProductAddedToCart}
                  {...p}
                />
              ))
            ) : loading ? (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(28rem,1fr))] p-3 gap-3 justify-center items-center">
                {...Array.from({ length: 10 }).map((_, i) => {
                  return <ShopItemPreload key={i} />;
                })}
              </div>
            ) : (
              <div className="mx-auto md:translate-x-[-5rem] w-fit mt-[5rem] flex flex-col items-center gap-[1.5rem]">
                <img src={noSuchProductImg} alt="No such product" />
                <h2 className="text-[4rem] mr-[1rem] text-center">
                  Nothing to show
                </h2>
              </div>
            )}
          </div>
        </div>
      </section>

      <InformativeModal
        closeOnClick={true}
        duration={1500}
        appearsFrom="bottom"
        positionX="right-[1rem]"
        positionY="bottom-[1rem]"
        type={informativeModalType}
        message={informativeModalMessage}
        setShowInformativeModal={setShowInformativeModal}
        showInformativeModal={showInformativeModal}
      />
    </>
  );
}
