import { Minus, Plus, ShoppingCart } from "lucide-react";
import FormatCurrency from "../../../../utilities/FormatCurrency";
import { ProductTypes } from "../../../../types/ProductTypes";
import { useState } from "react";
import useAddToCart from "../../../../hooks/Cart/useAddToCart";

type SingleItemAddToCartTypes = {
  setShowInformativeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setInformativeModalMessage: React.Dispatch<React.SetStateAction<string>>;
  setInformativeModalType: React.Dispatch<
    React.SetStateAction<"info" | "success" | "error">
  >;
  setProductAddedToCart: React.Dispatch<React.SetStateAction<boolean>>;
  setInformativeModalLinkMessage: React.Dispatch<React.SetStateAction<string>>;
  customerId: string | undefined;
} & ProductTypes;

export default function SingleItemAddToCart({
  price,
  _id,
  customerId,
  setInformativeModalType,
  setShowInformativeModal,
  setInformativeModalMessage,
  setInformativeModalLinkMessage,
  setProductAddedToCart,
}: SingleItemAddToCartTypes) {
  const [currentItemQty, setCurrentItemQty] = useState(1);
  const addToCart = useAddToCart();

  const handleAdding = () => {
    if (customerId) {
      addToCart({
        productId: _id,
        quantity: currentItemQty,
        userId: customerId,
      })
        .then(() => {
          setInformativeModalLinkMessage("");
          setInformativeModalType("success");
          setShowInformativeModal((prev) => !prev);
          setInformativeModalMessage(`Product was added to cart`);
          setProductAddedToCart((prev) => !prev);
        })
        .catch(() => {
          setInformativeModalType("error");
          setInformativeModalMessage("Something went wrong");
        });
    } else {
      setInformativeModalLinkMessage("Register");
      setInformativeModalType("info");
      setShowInformativeModal((prev) => !prev);
    }
  };
  const handleMinus = () => {
    setCurrentItemQty((prev) => {
      if (prev > 1) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  };

  const handlePlus = () => {
    setCurrentItemQty((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col w-full">
      <h3 className="md:block hidden text-[3rem] font-medium mb-5">
        {FormatCurrency(Number(price))}
      </h3>
      <div className="flex items-center md:flex-row flex-col gap-3 md:gap-7 w-full">
        <div className="flex bg-neutral-magnolia justify-between items-center rounded-xl w-full md:w-[20rem] ">
          <button
            onClick={handleMinus}
            className="text-[2rem] p-[1rem] text-primary-orange outline-none border-none"
          >
            <Minus />
          </button>
          <div className="p-[1rem] font-medium">{currentItemQty}</div>
          <button
            onClick={handlePlus}
            className="p-[1rem] text-primary-orange outline-none border-none "
          >
            <Plus />
          </button>
        </div>
        <button
          onClick={handleAdding}
          className="bg-primary-orange flex justify-center w-full text-white shadow-primary-orange shadow-md self-center py-[1rem] px-[1rem] rounded-xl hover:opacity-90 active:scale-[.97] transition-all"
        >
          Add To Cart
          <ShoppingCart />
        </button>
      </div>
    </div>
  );
}
