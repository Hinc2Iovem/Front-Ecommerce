import { ShoppingCart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import heart from "../../../assets/images/Shop/heart.png";
import hollowHeart from "../../../assets/images/Shop/hollowHeart.png";
import useGetDecodedJWTValues from "../../../hooks/Auth/useGetDecodedJWTValues";
import useAddToCart from "../../../hooks/Cart/useAddToCart";
import useAddToFavourite from "../../../hooks/Favourite/useAddToFavourite";
import useDeleteFromFavourite from "../../../hooks/Favourite/useDeleteFromFavourite";
import useGetFavourite from "../../../hooks/Favourite/useGetFavourite";
import { FavouriteTypes } from "../../../types/FavouriteTypes";
import { ProductTypes } from "../../../types/ProductTypes";
import FormatCurrency from "../../../utilities/FormatCurrency";
import ButtonHoverPromptModal from "../../shared/ButtonAsideHoverPromtModal/ButtonHoverPromptModal";
import { InformativeModalTypes } from "../../shared/Modal/InformativeModal";
import DisplayRating from "./DisplayRating";

type SingleItemTypes = {
  setProductAddedToCart: React.Dispatch<React.SetStateAction<boolean>>;
  setShowInformativeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setInformativeModalType: React.Dispatch<
    React.SetStateAction<InformativeModalTypes>
  >;
  setInformativeModalMessage: React.Dispatch<React.SetStateAction<string>>;
} & ProductTypes;

export default function SingleItem({
  description,
  _id,
  frontImg,
  price,
  rating,
  title,
  imgUrls,
  setShowInformativeModal,
  setProductAddedToCart,
  setInformativeModalMessage,
  setInformativeModalType,
}: SingleItemTypes) {
  const { userId } = useGetDecodedJWTValues();

  const getFavourite = useGetFavourite();

  const [favourite, setFavourite] = useState<FavouriteTypes | null>(null);

  const addToCart = useAddToCart();
  const addToFavourite = useAddToFavourite();
  const deleteFromFavourite = useDeleteFromFavourite();

  const [showAllImgs, setShowAllImgs] = useState(false);
  const [showCurrentImgNumber, setShowCurrentImgNumber] = useState(1);
  const [showCurrentImg, setShowCurrentImg] = useState(frontImg);
  const [addingCurrentProductId, setAddingCurrentProductId] = useState("");

  const allImgs = useMemo(() => {
    return [frontImg, ...imgUrls];
  }, [frontImg, imgUrls]);

  useEffect(() => {
    setShowCurrentImg(() => {
      if (allImgs[showCurrentImgNumber]) {
        return allImgs[showCurrentImgNumber];
      } else {
        return allImgs[0];
      }
    });
  }, [allImgs, showCurrentImgNumber]);

  useEffect(() => {
    if (userId) {
      getFavourite({
        productId: _id,
        userId,
      }).then((r) => {
        if (r) {
          setFavourite(r);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id, userId]);

  const [currentlyFavourite, setCurrentlyFavourite] = useState(
    favourite ? true : false
  );

  useEffect(() => {
    if (favourite) {
      setCurrentlyFavourite(true);
    }
  }, [favourite]);

  const handleAddingToFavourite = () => {
    if (userId) {
      addToFavourite({ userId, productId: _id });
      setInformativeModalMessage("Product was Added to Favourite");
      setInformativeModalType("success");
      setShowInformativeModal((prev) => !prev);
    } else {
      setShowInformativeModal((prev) => !prev);
      setInformativeModalMessage("You need to Register First");
      setInformativeModalType("info");
    }
  };

  const handleRemovingFromFavourite = () => {
    if (userId) {
      deleteFromFavourite({ userId, productId: _id }).then(() => {
        setInformativeModalMessage("Product was Removed from Favourite");
        setInformativeModalType("info");
        setShowInformativeModal((prev) => !prev);
      });
    } else {
      setShowInformativeModal((prev) => !prev);
      setInformativeModalMessage("You need to Register First");
      setInformativeModalType("info");
    }
  };

  const handleAddingToCart = () => {
    if (userId) {
      if (!addingCurrentProductId || !addingCurrentProductId.length) {
        addToCart({ userId, productId: _id, quantity: 1 }).then(() => {
          setProductAddedToCart((prev) => !prev);
          setAddingCurrentProductId("");
        });
        setInformativeModalMessage("Product was Added to Cart");
        setInformativeModalType("success");
        setShowInformativeModal((prev) => !prev);
      }
      setAddingCurrentProductId(_id);
    } else {
      setShowInformativeModal((prev) => !prev);
      setInformativeModalMessage("You need to Register First");
      setInformativeModalType("info");
    }
  };

  return (
    <div className="flex flex-col shadow-sm gap-3 bg-white p-3 rounded-xl justify-between relative h-[60rem] ">
      <DisplayRating rating={rating} />
      <div
        onMouseOver={() => setShowAllImgs(true)}
        onMouseOut={() => setShowAllImgs(false)}
        className="h-[23rem] mt-[2rem] w-full relative"
      >
        <img
          src={showAllImgs ? showCurrentImg : frontImg}
          alt={title}
          className="object-contain h-[23rem] w-full"
        />
        <div
          onMouseLeave={() => setShowCurrentImgNumber(0)}
          className={`${
            showAllImgs ? "flex" : "hidden"
          } absolute  top-0 bottom-0 w-full gap-[.2rem]`}
        >
          <div
            onMouseOver={() => setShowCurrentImgNumber(0)}
            className={`${
              showCurrentImgNumber === 0
                ? "border-green-300"
                : "border-gray-700"
            } w-[25%] border-b-[2px] rounded-sm transition-all`}
          ></div>
          <div
            onMouseOver={() => setShowCurrentImgNumber(1)}
            className={`${
              showCurrentImgNumber === 1
                ? "border-green-300"
                : "border-gray-700"
            } w-[25%] border-b-[2px] rounded-sm transition-all`}
          ></div>
          <div
            onMouseOver={() => setShowCurrentImgNumber(2)}
            className={`${
              showCurrentImgNumber === 2
                ? "border-green-300"
                : "border-gray-700"
            } w-[25%] border-b-[2px] rounded-sm transition-all`}
          ></div>
          <div
            onMouseOver={() => setShowCurrentImgNumber(3)}
            className={`${
              showCurrentImgNumber === 3
                ? "border-green-300"
                : "border-gray-700"
            } w-[25%] border-b-[2px] rounded-sm transition-all`}
          ></div>
        </div>
      </div>
      <Link
        to={`${_id}`}
        className="flex justify-between flex-col text-neutral-very-dark-blue hover:opacity-80"
      >
        <h3 className="break-all text-[2rem]">
          {title.length > 20 ? title.substring(0, 20) + "..." : title}
        </h3>
        <p className="text-gray-700 break-all text-[1.5rem]">
          {description.length > 200
            ? description.substring(0, 200) + "..."
            : description}
        </p>
      </Link>
      <h3 className="text-gray-700">Price - {FormatCurrency(+price)}</h3>

      <div className="w-full flex justify-center items-center gap-[.5rem]">
        <ButtonHoverPromptModal
          contentName={`${favourite ? "Remove Favourite" : "Add Favourite"}`}
          positionByAbscissa="left"
          variant={"rectangleWithShadow"}
          asideClasses="bottom-[-3.2rem]"
          onClick={() => {
            if (currentlyFavourite) {
              handleRemovingFromFavourite();
            } else {
              handleAddingToFavourite();
            }
            if (userId) {
              setCurrentlyFavourite((prev) => !prev);
            }
          }}
          className={`mt-[.9rem] bg-white shadow-md active:scale-[0.98] hover:scale-[1.02]`}
        >
          <img
            alt="Favourite"
            className={`${
              currentlyFavourite ? "w-[7rem] h-[4rem]" : "w-[7rem] h-[4rem]"
            }  object-contain p-[.2rem]`}
            src={currentlyFavourite ? heart : hollowHeart}
          />
        </ButtonHoverPromptModal>
        <button
          onClick={handleAddingToCart}
          className="bg-primary-orange flex justify-center w-full text-white shadow-primary-orange shadow-md self-center py-[.7rem] px-[1rem] rounded-xl hover:opacity-90 active:scale-[.97] transition-all"
        >
          Add To Cart
          <ShoppingCart />
        </button>
      </div>
    </div>
  );
}
