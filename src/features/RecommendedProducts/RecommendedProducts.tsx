import { useEffect, useState } from "react";
import useDebounce from "../../hooks/utilities/useDebounce";
import SearchBar from "../shared/SearchBar";
import RecommendedAmountOfProducts from "./RecommendedUpperParts/RecommendedAmountOfProducts";
import RecommendedLeftSide from "./RecommendedLeftSide";
import RecommendedProductsCarousel from "./RecommendedCarousel/RecommendedProductsCarousel";
import RecommendedRightSide from "./RecommendedRightSide/RecommendedRightSide";
import RecommendedShowCategories from "./RecommendedUpperParts/RecommendedShowCategories";
import { RecommendedProductsAmountTypes } from "../../types/RecommendedProducts";
import { Link } from "react-router-dom";
import home from "../../assets/images/shared/home.png";
import {
  getRecommendedProducts,
  getRecommendedSellerProductsAmount,
} from "../../api/queries/recommendedQueries";
import useGetDecodedJWTValues from "../../hooks/Auth/useGetDecodedJWTValues";

export default function RecommendedProducts() {
  const [value, setValue] = useState("");
  const [currentCategory, setCurrentCategory] = useState("All");
  const debouncedValue = useDebounce({ value, delay: 500 });
  const [currentProductId, setCurrentProductId] = useState("");
  const [carouselProductIds, setCarouselProductIds] = useState<string[]>([]);
  const { userId } = useGetDecodedJWTValues();
  const [productAmount, setProductAmount] =
    useState<RecommendedProductsAmountTypes | null>(null);

  const [amount, setAmount] = useState(
    productAmount?.amountOfProducts ? 10 - productAmount.amountOfProducts : 10
  );

  useEffect(() => {
    if (currentProductId) {
      getRecommendedSellerProductsAmount({ productId: currentProductId })
        .then((r) => {
          if (r) {
            setProductAmount(r);
            return r;
          } else {
            setProductAmount(null);
          }
        })
        .then((b) => {
          if (b) {
            setAmount(10 - b.amountOfProducts);
          } else {
            setAmount(10);
          }
        });
    }
  }, [currentProductId]);

  useEffect(() => {
    getRecommendedProducts({ productId: currentProductId }).then((r) => {
      if (r) {
        setCarouselProductIds(() => {
          return r.map((r) => r.recommendedProductId);
        });
      }
    });
  }, [currentProductId]);

  return (
    <section className="max-w-[146rem] p-[1rem] flex flex-col m-auto gap-[1rem]">
      <SearchBar setValue={setValue} />
      <RecommendedShowCategories
        setCurrentCategory={setCurrentCategory}
        currentCategory={currentCategory}
      />
      <div className="flex w-full justify-between mt-[2rem]">
        <Link to={`/profile/${userId}`}>
          <div className="flex items-center gap-[.5rem] bg-white p-[.5rem] rounded-md shadow-sm hover:scale-[1.01]">
            <img className="w-[3.5rem]" alt="Home" src={home} />
            <h2 className="text-[2rem] sm:block hidden">Back Home</h2>
          </div>
        </Link>
        <RecommendedAmountOfProducts
          productAmount={amount}
          currentProductId={currentProductId}
        />
      </div>
      <div className={`mt-[2rem] flex md:flex-row flex-col gap-[2rem]`}>
        <RecommendedLeftSide
          setCarouselProductIds={setCarouselProductIds}
          currentProductId={currentProductId}
          setCurrentProductId={setCurrentProductId}
        />
        <RecommendedRightSide
          setCurrentProductId={setCurrentProductId}
          userId={userId ?? ""}
          productAmount={amount}
          debouncedValue={debouncedValue}
          currentProductId={currentProductId}
          currentCategory={currentCategory}
          setCarouselProductIds={setCarouselProductIds}
          setProductAmount={setAmount}
          carouselProductIds={carouselProductIds}
        />
      </div>
      <RecommendedProductsCarousel
        currentProductId={currentProductId}
        carouselProductIds={carouselProductIds}
        setCarouselProductIds={setCarouselProductIds}
        setProductAmount={setAmount}
      />
    </section>
  );
}
