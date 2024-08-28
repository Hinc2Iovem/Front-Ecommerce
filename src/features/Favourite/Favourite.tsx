import { useEffect, useState } from "react";
import { CATEGORIES } from "../../const/PillsCategories";
import Header from "../Header/Header";
import useDebounce from "../../hooks/utilities/useDebounce";
import SearchBar from "../shared/SearchBar";
import FavouriteItem from "./FavouriteItem";
import useGetDecodedJWTValues from "../../hooks/Auth/useGetDecodedJWTValues";
import noSuchProductImg from "../../assets/images/shared/noProduct.png";
import InformativeModal, {
  InformativeModalTypes,
} from "../shared/Modal/InformativeModal";
import { FavouriteTypes } from "../../types/FavouriteTypes";
import { getAllFavouriteProducts } from "../../api/queries/favouriteProductQueries";

export default function Favourite() {
  const [informativeModalType, setInformativeModalType] =
    useState<InformativeModalTypes>("success");
  const [informativeModalMessage, setInformativeModalMessage] = useState("");
  const [showInformativeModal, setShowInformativeModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const { userId } = useGetDecodedJWTValues();
  const [currentCategory, setCurrentCategory] = useState(CATEGORIES.All);
  const [value, setValue] = useState("");
  const [headerValue, setHeaderValue] = useState("");
  const debouncedValue = useDebounce({ value, delay: 500 });
  const [allFavouriteProducts, setAllFavouriteProducts] = useState<
    FavouriteTypes[] | []
  >([]);
  const [amountOfProductIds, setAmountOfProductIds] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (userId) {
      getAllFavouriteProducts({ userId }).then((r) => {
        if (r) {
          setAllFavouriteProducts(r);
        }
      });
    }
  }, [userId]);

  useEffect(() => {
    if (allFavouriteProducts) {
      setLoading(false);
      setAmountOfProductIds(allFavouriteProducts.length);
    }
  }, [allFavouriteProducts]);

  const handleRemoveProduct = (removedProductId: string) => {
    setAllFavouriteProducts((prev) =>
      prev.filter((item) => item._id !== removedProductId)
    );
    setAmountOfProductIds((prev) => {
      if (prev) {
        return prev - 1;
      }
      return prev;
    });
  };

  return (
    <>
      <Header
        setValue={setHeaderValue}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />
      <section className="max-w-[146rem] p-[1rem] flex flex-col m-auto gap-[1rem]">
        <SearchBar setValue={setValue} />
        <div className="flex flex-col gap-[1.5rem]">
          <div className="md:flex hidden gap-[.5rem] justify-center">
            {Object.keys(CATEGORIES).map((key) => (
              <button
                key={key}
                onClick={() => setCurrentCategory(key)}
                className={`${
                  key === currentCategory
                    ? "bg-green-400 hover:opacity-100 text-white"
                    : "bg-white hover:bg-green-300"
                } outline-white p-[1rem] shadow-sm shadow-neutral-grayish-blue hover:translate-x-1 active:scale-[.97] hover:opacity-90 flex font-medium items-center gap-[.4rem] transition-all rounded-lg hover:p-[1rem]  hover:text-white`}
              >
                {key}
              </button>
            ))}
          </div>

          {(amountOfProductIds === 0 || amountOfProductIds === null) &&
          !loading &&
          (currentCategory !== "All" || headerValue) ? (
            <div
              className={`mx-auto w-fit mt-[5rem] flex flex-col items-center gap-[1.5rem]`}
            >
              <img src={noSuchProductImg} alt="No such product" />
              <h2 className="text-[4rem] mr-[1rem] text-center">
                Nothing to show
              </h2>
            </div>
          ) : (
            <div className="h-full w-full grid grid-cols-[repeat(auto-fit,minmax(25rem,35rem))] grid-rows-[repeat(auto-fit,minmax(30rem,1fr))] p-3 gap-3 justify-center">
              {userId && allFavouriteProducts.length ? (
                allFavouriteProducts.map((product) => {
                  return (
                    <FavouriteItem
                      key={product._id}
                      {...product}
                      handleRemoveProduct={handleRemoveProduct}
                      currentCategory={currentCategory}
                      debouncedValue={debouncedValue}
                      setInformativeModalMessage={setInformativeModalMessage}
                      setInformativeModalType={setInformativeModalType}
                      setShowInformativeModal={setShowInformativeModal}
                    />
                  );
                })
              ) : loading ? (
                <>
                  <div className="w-[29rem] h-[50rem] bg-white rounded-lg border-primary-pastel-blue border-[3px] border-dotted"></div>
                </>
              ) : null}
            </div>
          )}
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
