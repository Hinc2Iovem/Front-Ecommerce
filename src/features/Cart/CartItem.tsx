import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import useGetProductById from "../../hooks/Products/useGetProductById";
import FormatCurrency from "../../utilities/FormatCurrency";
import { CartTypes } from "../../types/CartTypes";
import { useState } from "react";
import useRemoveFromCart from "../../hooks/Cart/useRemoveFromCart";
import { InformativeModalTypes } from "../shared/Modal/InformativeModal";

type CartItemPageTypes = {
  balance: number;
  overAllPrice: number;
  setOverAllQuantity: React.Dispatch<React.SetStateAction<number>>;
  setOverAllPrice: React.Dispatch<React.SetStateAction<number>>;
  setAllowCheckout: React.Dispatch<React.SetStateAction<boolean>>;
  setShowInformativeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setInformativeModalType: React.Dispatch<
    React.SetStateAction<InformativeModalTypes>
  >;
  setInformativeModalMessage: React.Dispatch<React.SetStateAction<string>>;
  setProductRemovedFromCart: React.Dispatch<React.SetStateAction<boolean>>;
  setRemovedProductId: React.Dispatch<React.SetStateAction<string>>;
  setRemovedProductPrice: React.Dispatch<React.SetStateAction<number>>;
} & CartTypes;

export default function CartItemPage({
  _id,
  productId,
  quantity,
  totalPrice,
  balance,
  overAllPrice,
  setOverAllQuantity,
  setOverAllPrice,
  setAllowCheckout,
  setInformativeModalMessage,
  setInformativeModalType,
  setShowInformativeModal,
  setProductRemovedFromCart,
  setRemovedProductId,
  setRemovedProductPrice,
}: CartItemPageTypes) {
  const product = useGetProductById(productId);
  const [productRemoved, setProductRemoved] = useState(false);
  const removeFromCart = useRemoveFromCart();

  const handleRemove = () => {
    setProductRemoved(true);
    setOverAllQuantity((prev) => (prev -= quantity));
    setOverAllPrice((prev) => (prev -= totalPrice));
    setAllowCheckout(balance >= overAllPrice);
    removeFromCart({ cartId: _id });
    setInformativeModalMessage("Product was removed");
    setInformativeModalType("info");
    setShowInformativeModal((prev) => !prev);
    setProductRemovedFromCart((prev) => !prev);
    if (product?._id) {
      setRemovedProductId(product._id);
      setRemovedProductPrice(Number(product.price));
    }
  };

  if (!product) {
    return (
      <div className="flex flex-col bg-white p-[1rem] rounded-lg shadow-sm gap-[.5rem] relative max-w-[40rem] w-full h-[30rem]`">
        <div className="w-full h-[60%] bg-white shadow-sm"></div>
        <div className="flex flex-col gap-[.5rem]">
          <div className="w-full h-[3rem] shadow-sm"></div>
          <div className="w-[30%] h-[3rem] shadow-sm"></div>
          <div className="w-[50%] h-[3rem] shadow-sm"></div>
        </div>
        <ClipLoader className="absolute top-[1rem] right-[1rem]" size={20} />
      </div>
    );
  }

  return (
    <div
      className={`${
        productRemoved ? "hidden" : "flex"
      } flex-col bg-white p-[1rem] rounded-lg shadow-sm gap-[.5rem] font-medium relative w-full h-full`}
    >
      <img
        src={product.frontImg}
        className="object-contain w-full h-[15rem]"
        alt={product.title}
      />
      <Link to={`/shop/${product._id}`}>
        <h3 className="text-ellipsis w-full hover:text-primary-orange">
          {product.title.length > 50
            ? product.title.substring(0, 50) + "..."
            : product.title}
        </h3>
      </Link>
      <div className="mt-auto">
        <p>{FormatCurrency(+product.price)}</p>
        <h3>Total Price: {FormatCurrency(totalPrice)}</h3>
      </div>
      <button
        onClick={handleRemove}
        className="transition-all absolute hover:bg-white hover:shadow-sm hover:shadow-black hover:rounded-full p-[.5rem] hover:before:shadow-sm hover:before:bg-white hover:before:rounded-sm hover:before:shadow-black hover:before:content-['Remove'] hover:before:absolute hover:before:bottom-[-4rem] hover:before:left-[-1.5rem] hover:before:p-[.5rem] top-[.5rem] left-[.5rem]"
      >
        <X />
      </button>
      <div className="absolute right-[10px] top-[9px] font-bold text-[1.4rem]">
        x{quantity}
      </div>
    </div>
  );
}
