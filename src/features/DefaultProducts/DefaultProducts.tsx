import { useEffect, useState } from "react";
import { getDefaultRecommendedProductsAmount } from "../../api/queries/defaultRecommendedQueries";
import { Link } from "react-router-dom";
import useDebounce from "../../hooks/utilities/useDebounce";
import SearchBar from "../shared/SearchBar";
import DefaultProductsList from "./DefaultMainPart/DefaultProductsList";
import DefaultChosenCategories from "./DefaultUpperParts/DefaultChosenCategories";
import DefaultProductsAmount from "./DefaultUpperParts/DefaultProductsAmount";
import DefaultProductsCategoryPills from "./DefaultUpperParts/DefaultProductsCategoryPills";
import home from "../../assets/images/shared/home.png";
import useGetDecodedJWTValues from "../../hooks/Auth/useGetDecodedJWTValues";

export default function DefaultProducts() {
  const [value, setValue] = useState("");
  const { userId } = useGetDecodedJWTValues();
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentSubCategory, setCurrentSubCategory] = useState("");
  const [lockCategories, setLockCategories] = useState(false);
  const debouncedValue = useDebounce({ value, delay: 500 });

  const [fetchedValue, setFetchedValue] = useState<number | undefined>();
  const [currentValue, setCurrentValue] = useState<number>(0);

  useEffect(() => {
    setCurrentSubCategory("");
  }, [currentCategory]);

  useEffect(() => {
    getDefaultRecommendedProductsAmount({
      category: currentCategory,
      sellerId: userId ?? "",
      subCategory: currentSubCategory,
    }).then((r) => {
      if (r) {
        setFetchedValue(r.amountOfProducts);
        setCurrentValue(r.amountOfProducts);
      }
      return r;
    });
  }, [currentCategory, currentSubCategory, userId]);

  useEffect(() => {
    if (fetchedValue) {
      setCurrentValue(fetchedValue ?? 0);
    }
  }, [fetchedValue, currentCategory, currentSubCategory]);

  return (
    <section className="max-w-[146rem] p-[1rem] flex flex-col m-auto gap-[1rem]">
      <DefaultProductsCategoryPills
        currentCategory={currentCategory}
        currentSubCategory={currentSubCategory}
        setCurrentCategory={setCurrentCategory}
        setCurrentSubCategory={setCurrentSubCategory}
        lockCategories={lockCategories}
      />
      <div className="flex gap-[1rem]">
        <Link to={`/profile/${userId}`}>
          <img
            src={home}
            alt="home"
            className="w-[5.5rem] h-full object-cover hover:scale-[1.01]"
          />
        </Link>
        <SearchBar setValue={setValue} />
      </div>
      <div className="w-full justify-between flex sm:flex-row flex-col sm:items-center">
        <DefaultChosenCategories
          currentCategory={currentCategory}
          currentSubCategory={currentSubCategory}
          setLockCategories={setLockCategories}
        />
        <DefaultProductsAmount currentValue={currentValue as number} />
      </div>
      <DefaultProductsList
        setCurrentValue={setCurrentValue}
        currentCategory={currentCategory}
        currentSubCategory={currentSubCategory}
        debouncedValue={debouncedValue}
        userId={userId ?? ""}
      />
    </section>
  );
}
