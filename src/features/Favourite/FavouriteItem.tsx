import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FavouriteTypes } from "../../types/FavouriteTypes";
import { ProductTypes } from "../../types/ProductTypes";
import FormatCurrency from "../../utilities/FormatCurrency";
import useGetProductById from "../../hooks/Products/useGetProductById";
import remove from "../../assets/images/shared/exit.png";
import useDeleteFromFavourite from "../../hooks/Favourite/useDeleteFromFavourite";
import { InformativeModalTypes } from "../shared/Modal/InformativeModal";

type FavouriteItemTypes = {
  debouncedValue: string;
  currentCategory: string;
  handleRemoveProduct: (productId: string) => void;
  setInformativeModalType: React.Dispatch<
    React.SetStateAction<InformativeModalTypes>
  >;
  setInformativeModalMessage: React.Dispatch<React.SetStateAction<string>>;
  setShowInformativeModal: React.Dispatch<React.SetStateAction<boolean>>;
} & FavouriteTypes;

export default function FavouriteItem({
  debouncedValue,
  productId,
  userId,
  currentCategory,
  setInformativeModalMessage,
  setInformativeModalType,
  setShowInformativeModal,
  handleRemoveProduct,
}: FavouriteItemTypes) {
  const product = useGetProductById(productId);
  const [removedProductId, setRemoveProductId] = useState("");

  const allProducts = useMemo(() => {
    if (!userId) {
      return [];
    }
    if (!product || product._id === removedProductId) return [];

    const isMatch = (text: string, query: string) =>
      text.trim().toLowerCase().includes(query.trim().toLowerCase());

    const debouncedQuery = debouncedValue.trim().toLowerCase();
    const isProductInCurrentCategory =
      currentCategory === "All" || product.category === currentCategory;
    const isProductMatchDebouncedValue =
      !debouncedQuery ||
      isMatch(product.title, debouncedQuery) ||
      isMatch(product.description, debouncedQuery);

    return isProductInCurrentCategory && isProductMatchDebouncedValue
      ? [product]
      : [];
  }, [currentCategory, product, debouncedValue, userId, removedProductId]);

  if (!product) {
    return (
      <div className="bg-white w-[35rem] h-[45rem] overflow-hidden p-[1rem] rounded-lg border-primary-pastel-blue border-[3px] border-dotted flex flex-col gap-[1rem] justify-between relative"></div>
    );
  }

  return (
    <>
      {allProducts.map((p) => {
        return (
          <FavouriteItemDisplay
            key={p._id}
            customerId={userId}
            setInformativeModalMessage={setInformativeModalMessage}
            setInformativeModalType={setInformativeModalType}
            setShowInformativeModal={setShowInformativeModal}
            handleRemoveProduct={handleRemoveProduct}
            setRemoveProductId={setRemoveProductId}
            {...p}
          />
        );
      })}
    </>
  );
}

type FavouriteItemDisplayTypes = {
  customerId: string;
  setRemoveProductId: React.Dispatch<React.SetStateAction<string>>;
  setInformativeModalType: React.Dispatch<
    React.SetStateAction<InformativeModalTypes>
  >;
  setInformativeModalMessage: React.Dispatch<React.SetStateAction<string>>;
  setShowInformativeModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleRemoveProduct: (productId: string) => void;
} & ProductTypes;

function FavouriteItemDisplay({
  _id,
  description,
  frontImg,
  price,
  title,
  customerId,
  setInformativeModalMessage,
  setInformativeModalType,
  setShowInformativeModal,
  handleRemoveProduct,
  setRemoveProductId,
}: FavouriteItemDisplayTypes) {
  const deleteFromFavourite = useDeleteFromFavourite();
  const handleRemoving = () => {
    if (customerId) {
      handleRemoveProduct(_id);
      setInformativeModalMessage("Product was removed from Favourite");
      setInformativeModalType("info");
      setShowInformativeModal((prev) => !prev);
      setRemoveProductId(_id);
      deleteFromFavourite({ productId: _id, userId: customerId });
    } else {
      setInformativeModalMessage("You need to register first");
      setInformativeModalType("info");
      setShowInformativeModal((prev) => !prev);
    }
  };

  return (
    <div className="bg-white w-full max-w-[35rem] h-full overflow-hidden p-[1rem] rounded-lg border-primary-pastel-blue border-[3px] border-dotted flex flex-col gap-[1rem] justify-between relative">
      <button
        onClick={handleRemoving}
        className="absolute top-[1rem] left-[1rem] hover:scale-[1.02] active:scale-[0.98]"
      >
        <img src={remove} alt="X" className="w-[3rem]" />
      </button>
      <img
        src={frontImg}
        alt={title}
        className="w-full object-contain h-[25rem]"
      />
      <div className="flex flex-col gap-[.3rem] w-full">
        <Link
          to={`/shop/${_id}`}
          className="font-medium hover:opacity-80 transition-all w-full break-words"
        >
          <h5>{title}</h5>
        </Link>

        <p className=" text-gray-700 break-words">
          {description.length > 200
            ? description.substring(0, 200) + "..."
            : description}
        </p>
        <h5 className="font-medium text-[1.5rem]">
          Price: {FormatCurrency(Number(price))}
        </h5>
      </div>
    </div>
  );
}
