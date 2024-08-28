import { useEffect, useMemo, useState } from "react";
import { ProductTypes } from "../../types/ProductTypes";
import SearchBar from "../shared/SearchBar";
import useDebounce from "../../hooks/utilities/useDebounce";
import FormatCurrency from "../../utilities/FormatCurrency";
import { Link } from "react-router-dom";
import noSuchProductImg from "../../assets/images/shared/noProduct.png";
import {
  getBoughtProductsByUserId,
  getProductsByUserId,
  getSoldProductsByUserId,
} from "../../api/queries/productQueries";

type ProfileProductsSideTypes = {
  userId: string;
  currentCategoryUser: string;
  currentCategory: string;
};

export default function ProfileProductsSide({
  userId,
  currentCategoryUser,
  currentCategory,
}: ProfileProductsSideTypes) {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce({ value, delay: 500 });

  const [sellingProducts, setSellingProducts] = useState<ProductTypes[] | []>(
    []
  );
  const [boughtProducts, setBoughtProducts] = useState<ProductTypes[] | []>([]);
  const [soldProducts, setSoldProducts] = useState<ProductTypes[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    getProductsByUserId({ userId }).then((r) => {
      if (r) {
        setSellingProducts(r);
      }
    });
    getBoughtProductsByUserId({ userId }).then((r) => {
      if (r) {
        setBoughtProducts(r);
      }
    });
    getSoldProductsByUserId({ userId }).then((r) => {
      if (r) {
        setSoldProducts(r);
      }
    });
  }, [userId]);

  const productsToDisplay: ProductTypes[] = useMemo(() => {
    let filtered: ProductTypes[] = [];

    if (currentCategoryUser === "Selling Products") {
      filtered = sellingProducts;
    } else if (currentCategoryUser === "Bought Products") {
      filtered = boughtProducts;
    } else if (currentCategoryUser === "Sold Products") {
      filtered = soldProducts;
    }

    if (currentCategory !== "All") {
      filtered = filtered.filter((p) =>
        p.category.toLowerCase().includes(currentCategory.toLowerCase())
      );
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
  }, [
    sellingProducts,
    boughtProducts,
    soldProducts,
    currentCategoryUser,
    currentCategory,
    debouncedValue,
  ]);

  if (loading) {
    return (
      <div className="flex-grow gap-[1rem] grid grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] grid-rows-[repeat(auto-fit,minmax(30rem,1fr))]">
        <div className="w-full h-[50rem] bg-white rounded-lg border-primary-pastel-blue border-[3px] border-dotted"></div>
        <div className="w-full h-[50rem] bg-white rounded-lg border-primary-pastel-blue border-[3px] border-dotted"></div>
        <div className="w-full h-[50rem] bg-white rounded-lg border-primary-pastel-blue border-[3px] border-dotted"></div>
        <div className="w-full h-[50rem] bg-white rounded-lg border-primary-pastel-blue border-[3px] border-dotted"></div>
        <div className="w-full h-[50rem] bg-white rounded-lg border-primary-pastel-blue border-[3px] border-dotted"></div>
        <div className="w-full h-[50rem] bg-white rounded-lg border-primary-pastel-blue border-[3px] border-dotted"></div>
      </div>
    );
  }

  return (
    <div className="flex-grow">
      <SearchBar setValue={setValue} />
      <div
        className={`${
          productsToDisplay.length
            ? "grid grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] grid-rows-[repeat(auto-fit,minmax(30rem,1fr))]"
            : ""
        }  p-3 gap-3 `}
      >
        {productsToDisplay.length ? (
          productsToDisplay.map((p) => (
            <ProfileProductItem
              key={p._id}
              product={p}
              currentCategoryUser={currentCategoryUser}
            />
          ))
        ) : !productsToDisplay.length &&
          !loading &&
          (currentCategory !== "All" || value) ? (
          <div className="mx-auto w-fit mt-[5rem] flex flex-col items-center gap-[1.5rem]">
            <img src={noSuchProductImg} alt="No such product" />
            <h2 className="text-[4rem] mr-[1rem] text-center">
              Nothing to show
            </h2>
          </div>
        ) : null}
      </div>
    </div>
  );
}

type ProductWithQuantityTypes = {
  quantity?: number;
} & ProductTypes;

type ProfileProductItemTypes = {
  product: ProductWithQuantityTypes;
  currentCategoryUser: string;
};

function ProfileProductItem({
  product,
  currentCategoryUser,
}: ProfileProductItemTypes) {
  return (
    <div className="bg-white w-full h-full overflow-hidden p-[1rem] rounded-lg border-primary-pastel-blue border-[3px] border-dotted flex flex-col gap-[1rem] justify-between relative">
      <p
        className={`${
          currentCategoryUser === "Sold Products" ||
          currentCategoryUser === "Bought Products"
            ? ""
            : "hidden"
        } absolute right-[1rem] top-[1rem] z-[1] font-medium text-[1.5rem] bg-white p-[.2rem] rounded-md shadow-md shadow-gray-300`}
      >
        x{product.quantity && product.quantity}
      </p>
      <img
        src={product.frontImg}
        alt={product.title}
        className="w-full object-contain h-[25rem]"
      />
      <div className="flex flex-col gap-[.3rem] w-full">
        <Link
          to={`/shop/${product._id}`}
          className="font-medium hover:opacity-80 transition-all w-full break-words"
        >
          <h5>{product.title}</h5>
        </Link>

        <p className=" text-gray-700 break-words">
          {product.description.length > 200
            ? product.description.substring(0, 200) + "..."
            : product.description}
        </p>
        <h5 className="font-medium text-[1.5rem]">
          Price: {FormatCurrency(Number(product.price))}
        </h5>
      </div>
    </div>
  );
}
