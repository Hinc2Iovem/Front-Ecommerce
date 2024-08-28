import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderCartModalItem from "./HeaderCartModalItem";
import useGetUser from "../../hooks/Profile/useGetUser";
import { CartTypes } from "../../types/CartTypes";
import FormatCurrency from "../../utilities/FormatCurrency";
import useGetDecodedJWTValues from "../../hooks/Auth/useGetDecodedJWTValues";
import useGetAllCarts from "../../hooks/Cart/useGetAllCarts";
import InformativeModal, {
  InformativeModalTypes,
} from "../shared/Modal/InformativeModal";
import useCheckoutCart from "../../hooks/Cart/useCheckoutCart";

type HeaderCartModalTypes = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  productAddedToCart?: boolean;
  productRemovedFromCart?: boolean;
  removedProductId?: string;
  removedProductPrice?: number;
};

export default function HeaderCartModal({
  setShowModal,
  showModal,
  productAddedToCart,
  productRemovedFromCart,
  removedProductId,
  removedProductPrice,
}: HeaderCartModalTypes) {
  const [informativeModalType, setInformativeModalType] =
    useState<InformativeModalTypes>("success");
  const [informativeModalMessage, setInformativeModalMessage] = useState("");
  const [showInformativeModal, setShowInformativeModal] = useState(false);

  const checkout = useCheckoutCart();
  const { userId } = useGetDecodedJWTValues();
  const [carts, setCarts] = useState<CartTypes[] | []>([]);
  const getCartsByUserId = useGetAllCarts();
  const user = useGetUser({ userId: userId ?? "" });
  const [userBalance, setUserBalance] = useState(user ? user.balance : 0);

  useEffect(() => {
    if (userId) {
      getCartsByUserId({ userId }).then((r) => {
        if (r) {
          setCarts(r);
          console.log(r);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, productAddedToCart]);

  useEffect(() => {
    setCarts((prev) =>
      prev.filter((item) => item.productId !== removedProductId)
    );
    setTotalItems((prev) => prev - 1);
    if (removedProductPrice) {
      setTotalPrice((prev) => prev - removedProductPrice);
    }
  }, [productRemovedFromCart, removedProductId, removedProductPrice]);

  useEffect(() => {
    if (user) {
      setUserBalance(user.balance);
    }
  }, [user]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (carts) {
      setTotalPrice(() => {
        return carts.reduce((acc, curr) => {
          return acc + curr.totalPrice;
        }, 0);
      });
      setTotalItems(() => {
        return carts.reduce((acc, curr) => {
          return acc + curr.quantity;
        }, 0);
      });
    }
  }, [carts]);

  const handleCheckout = () => {
    if (userId) {
      if (totalPrice <= user.balance) {
        setShowModal(false);
        setCarts([]);
        checkout({ userId });
        setShowInformativeModal((prev) => !prev);
        setInformativeModalMessage("Checkout was successeful");
        setInformativeModalType("success");
        setUserBalance((prev) => (prev -= totalPrice));
      }
    } else {
      setShowInformativeModal((prev) => !prev);
      setInformativeModalMessage("You need to Register first");
      setInformativeModalType("info");
    }
  };

  return (
    <>
      <div
        className={`${
          !showModal ? "hidden" : "flex flex-col gap-3 fixed overflow-y-auto"
        } right-[10px] top-28 bg-white p-[2rem] w-max rounded-lg z-[20] border-[1px] border-solid border-black | cart-arrow-up`}
      >
        <h3>Items Count: {totalItems}</h3>
        <hr />
        <div className="flex flex-col gap-3 max-h-[20rem] overflow-y-auto relative">
          {carts.map((c) => (
            <HeaderCartModalItem
              key={c._id}
              removedProductId={removedProductId}
              {...c}
            />
          ))}
        </div>

        <hr />
        <p>Total: {FormatCurrency(totalPrice ? totalPrice : 0)}</p>
        <p>Balance: {FormatCurrency(userBalance)}</p>
        <hr />
        <div className="flex flex-col gap-3">
          <Link
            className="flex gap-3 px-3 py-1 rounded-lg border-neutral-magnolia bg-neutral-magnolia hover:bg-blue-100 transition-all"
            to="/cart"
            onClick={() => setShowModal(false)}
          >
            <h3 className="mx-auto whitespace-nowrap flex gap-[.2rem]">
              View <ShoppingCart />
            </h3>
          </Link>
          <button
            disabled={totalPrice >= user.balance}
            onClick={handleCheckout}
            className={`${
              totalPrice >= user.balance
                ? "bg-red-50 hover:bg-red-100 hover:cursor-not-allowed"
                : "bg-green-50 hover:bg-green-100"
            }  px-3 py-1 rounded-lg transition-all`}
          >
            Checkout
          </button>
        </div>
      </div>
      {/* <LightBox
        isLightBox={isLightBox}
        setIsLightBox={setIsLightBox}
        showModal={setShowModalLoading}
      />
      <div
        className={` ${
          showModalLoading ? "" : "hidden"
        } fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-[10] shadow-md shadow-white rounded-full`}
      >
        <ClockLoader size={120} loading={showModalLoading} className="" />
      </div> */}

      <InformativeModal
        closeOnClick={true}
        duration={2000}
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
