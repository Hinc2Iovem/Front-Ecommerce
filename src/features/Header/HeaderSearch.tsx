import {
  Heart,
  LogIn,
  Menu,
  Search,
  ShoppingCart,
  UserCircle2,
} from "lucide-react";
import { useEffect, useRef, useState, forwardRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HeaderCartModal from "./HeaderCartModal";
import useLocalStorage from "../../hooks/utilities/useLocalStorage";
import useOutOfModal from "../../hooks/UI/useOutOfModal";
import ButtonHoverPromptModal from "../shared/ButtonAsideHoverPromtModal/ButtonHoverPromptModal";
import useGetDecodedJWTValues from "../../hooks/Auth/useGetDecodedJWTValues";
import InformativeModal from "../shared/Modal/InformativeModal";

type HeaderSearchProps = {
  setValue: React.Dispatch<React.SetStateAction<string>> | undefined;
  setExpandBurgerMenu: React.Dispatch<React.SetStateAction<boolean>>;
  productAddedToCart?: boolean;
  secondModalRef: React.MutableRefObject<HTMLDivElement | null>;
  productRemovedFromCart?: boolean;
  removedProductId?: string;
  removedProductPrice?: number;
};

const HeaderSearch = forwardRef<HTMLDivElement, HeaderSearchProps>(
  (
    {
      setExpandBurgerMenu,
      setValue,
      productAddedToCart,
      secondModalRef,
      productRemovedFromCart,
      removedProductId,
      removedProductPrice,
    },
    ref
  ) => {
    const [showModal, setShowModal] = useState(false);
    const [showInformativeModal, setShowInformativeModal] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { userId } = useGetDecodedJWTValues();
    const [search, setSearch] = useLocalStorage("search", "");
    const modalRef = useRef<HTMLDivElement | null>(null);

    useOutOfModal({ setShowModal, showModal, modalRef });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (pathname !== "/shop") {
        navigate("/shop");
      }
      if (setValue) {
        setValue(search);
      }
    };

    useEffect(() => {
      if (pathname === "/shop") {
        if (setValue) {
          setValue(search);
        }
      }
    }, [pathname, search, setValue]);

    return (
      <>
        <nav className="flex justify-between flex-grow md:shadow-md p-5 items-center w-full">
          <h1 className="text-[3rem] transition-all text-neutral-dark-grayish-blue shadow-sm px-[1rem] py-[.5rem] rounded-md shadow-gray-400 md:block hidden">
            <Link to={"/shop"}>Hinc2Iovem</Link>
          </h1>
          <form
            noValidate
            onSubmit={handleSubmit}
            className="flex items-center h-[5rem] md:w-[45%] md:mx-auto"
          >
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setValue && setValue(e.target.value);
              }}
              type="text"
              placeholder="Search"
              className="z-[2] border-r-0 border-none shadow-sm shadow-black h-full w-full font-bold md:px-[2rem] px-[1rem] py-[1rem] rounded-l-full outline-none"
            />
            <button
              type="submit"
              className="hover:z-[3] hover:scale-[1.01] h-full px-[2.5rem] cursor-pointer rounded-r-full border-l-[1px] border-none shadow-sm shadow-black"
            >
              <Search />
            </button>
          </form>
          <ul className="md:flex items-center gap-[2rem] hidden">
            <Link to="/favourite">
              <ButtonHoverPromptModal
                className="p-[.7rem] top-[.5rem] left-[.5rem] font-medium hover:bg-white hover:shadow-black"
                contentName="Favourite"
                positionByAbscissa="right"
              >
                <Heart />
              </ButtonHoverPromptModal>
            </Link>
            <div
              ref={modalRef}
              className="flex relative outline-none border-none"
            >
              <ButtonHoverPromptModal
                className="p-[.7rem] top-[.5rem] left-[.5rem] font-medium hover:bg-white hover:shadow-black"
                onClick={() => setShowModal((prev) => !prev)}
                hideModal={showModal}
                contentName="Cart"
                positionByAbscissa="right"
              >
                <ShoppingCart />
              </ButtonHoverPromptModal>

              <HeaderCartModal
                removedProductPrice={removedProductPrice}
                setShowModal={setShowModal}
                productRemovedFromCart={productRemovedFromCart}
                removedProductId={removedProductId}
                showModal={showModal}
                productAddedToCart={productAddedToCart}
              />
            </div>
            {userId ? (
              <Link to={`/profile/${userId}`}>
                <ButtonHoverPromptModal
                  className="p-[.7rem] top-[.5rem] left-[.5rem] font-medium hover:bg-white hover:shadow-black"
                  contentName="Profile"
                  positionByAbscissa="right"
                >
                  <UserCircle2 />
                </ButtonHoverPromptModal>
              </Link>
            ) : (
              <ButtonHoverPromptModal
                className="p-[.7rem] top-[.5rem] left-[.5rem] font-medium hover:bg-white hover:shadow-black"
                contentName="Profile"
                positionByAbscissa="right"
                onClick={() => setShowInformativeModal((prev) => !prev)}
              >
                <UserCircle2 />
              </ButtonHoverPromptModal>
            )}
            <Link
              to="/auth"
              className={`${
                userId ? "hidden" : "flex"
              } items-center gap-[.4rem] transition-all rounded-lg hover:p-[.3rem] hover:bg-primary-orange hover:text-white`}
            >
              <LogIn />
            </Link>
          </ul>
          <div ref={secondModalRef} className="md:hidden flex">
            <Menu
              className="w-[3rem] h-[3rem] cursor-pointer text-black"
              onClick={() => setExpandBurgerMenu(true)}
            />
          </div>
        </nav>
        <InformativeModal
          closeOnClick={true}
          appearsFrom="right"
          positionX="right-[1rem]"
          positionY="top-[10rem]"
          type="info"
          message="You need to Register First"
          setShowInformativeModal={setShowInformativeModal}
          showInformativeModal={showInformativeModal}
          linkMessage="Register"
          linkPath="/auth"
        />
      </>
    );
  }
);

export default HeaderSearch;
