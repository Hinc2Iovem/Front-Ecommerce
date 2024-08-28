import { Gem, ListPlus, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CATEGORIES_SELLER } from "../../const/CATEGORIES_SELLER";
import { CATEGORIES_WITHOUT_SUBCATEGORIES } from "../../const/PillsCategories";
import Header from "../Header/Header";
import useGetUser from "../../hooks/Profile/useGetUser";
import ButtonHoverPromptModal from "../shared/ButtonAsideHoverPromtModal/ButtonHoverPromptModal";
import ProfileFooter from "./ProfileFooter";
import ProfileProductsSide from "./ProfileProductsSide";
import ProfileUserSide from "./ProfileUserSide";
import useOutOfModalTwoRefs from "../../hooks/UI/useOutOfModalTwoRefs";
import MoneyModel from "./MoneyModel";
import dollar from "../../assets/images/profile/dollar.png";
import recommendation from "../../assets/images/profile/recommendation.png";
import defaultRecommendation from "../../assets/images/profile/defaultRecommendation.png";
import useGetDecodedJWTValues from "../../hooks/Auth/useGetDecodedJWTValues";
import { Logout } from "../../api/queries/authQueries";
import useAuth from "../../hooks/Auth/useAuth";

export default function Profile() {
  const [currentCategory, setCurrentCategory] = useState(
    CATEGORIES_WITHOUT_SUBCATEGORIES.All
  );
  const { userId } = useGetDecodedJWTValues();
  const {
    roles,
    _id: id,
    balance,
    username,
  } = useGetUser({ userId: userId ?? "" });
  const [currentCategoryUser, setCurrentCategoryUser] = useState(
    CATEGORIES_SELLER.SELLING_PRODUCTS
  );
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [updatedMoney, setUpdatedMoney] = useState(balance ? balance : 0);
  const [moneyModal, setMoneyModal] = useState(false);
  const { setAuth } = useAuth();

  useEffect(() => {
    if (balance) {
      setUpdatedMoney(balance);
    }
  }, [balance]);

  const secondModalRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useOutOfModalTwoRefs({
    modalRef,
    secondModalRef,
    setShowModal: setMoneyModal,
    showModal: moneyModal,
  });

  const handleLogOut = async () => {
    await Logout().then(() => {
      setAuth({ accessToken: "" });
      navigate("/shop");
    });
  };

  return (
    <>
      <section
        className={`h-full flex flex-col ${
          roles?.includes("Seller") ? "" : "justify-between"
        }  items-center`}
      >
        <Header
          setValue={setValue}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
        />
        <div className="flex flex-col p-[2rem] pt-[1rem] max-w-[144rem] w-full">
          <div className="flex items-center justify-between relative">
            <div
              className={`${
                roles?.includes("Admin") ? "visible" : "hidden"
              } gap-[.5rem]`}
            >
              <Link to="/permissions">
                <ButtonHoverPromptModal
                  className="bg-white m-0 shadow-md hover:bg-primary-orange font-medium"
                  variant="rectangleWithShadow"
                  contentName="Give Permission For Becoming A Seller"
                  positionByAbscissa="left"
                >
                  <Gem className="w-[3.5rem] h-[3.5rem]" />
                </ButtonHoverPromptModal>
              </Link>
            </div>

            <div className={`mb-[1rem] flex gap-[.5rem] ml-auto`}>
              <div
                className={`${
                  roles?.includes("Seller") ? "visible" : "hidden"
                } flex gap-[.5rem]`}
              >
                <Link to="/add/products">
                  <ButtonHoverPromptModal
                    className="bg-white m-0 shadow-md hover:bg-primary-orange font-medium w-[4rem] h-[4rem] p-[.5rem]"
                    variant="rectangleWithShadow"
                    contentName="Add Product"
                    positionByAbscissa="right"
                  >
                    <ListPlus className="w-full h-full" />
                  </ButtonHoverPromptModal>
                </Link>
                <Link to="/defaultProducts">
                  <ButtonHoverPromptModal
                    className="bg-white m-0 shadow-md w-[4rem] h-[4rem] p-[.5rem] active:scale-[0.96]"
                    variant="rectangleWithShadow"
                    contentName="Add Default Recommendations"
                    positionByAbscissa="right"
                  >
                    <img
                      src={defaultRecommendation}
                      alt="defaultRecommendations"
                    />
                  </ButtonHoverPromptModal>
                </Link>
                <Link to="/recommendedProducts">
                  <ButtonHoverPromptModal
                    className="bg-white m-0 shadow-md w-[4rem] h-[4rem] p-[.5rem] active:scale-[0.96]"
                    variant="rectangleWithShadow"
                    contentName="Add Recommendations"
                    positionByAbscissa="right"
                  >
                    <img src={recommendation} alt="Recommendations" />
                  </ButtonHoverPromptModal>
                </Link>
              </div>

              <div ref={modalRef}>
                <ButtonHoverPromptModal
                  className="bg-white m-0 shadow-md w-[4rem] h-[4rem] p-[.5rem] active:scale-[0.96]"
                  variant="rectangleWithShadow"
                  contentName="Add Money"
                  positionByAbscissa="right"
                  onClick={() => {
                    if (moneyModal) {
                      setMoneyModal(false);
                    } else {
                      setMoneyModal(true);
                    }
                  }}
                >
                  <img src={dollar} alt="Money" className="w-full h-full" />
                </ButtonHoverPromptModal>
              </div>
            </div>
            <MoneyModel
              userId={userId ?? ""}
              setUpdatedMoney={setUpdatedMoney}
              setMoneyModal={setMoneyModal}
              moneyModal={moneyModal}
              secondModalRef={secondModalRef}
            />
          </div>

          <div className="flex gap-[2rem] justify-between md:flex-row flex-col">
            <ProfileUserSide
              roles={roles}
              currentCategoryUser={currentCategoryUser}
              setCurrentCategoryUser={setCurrentCategoryUser}
              username={username}
              currentCategory={currentCategory}
              setCurrentCategory={setCurrentCategory}
              balance={updatedMoney}
              userId={userId as string}
            />
            <ProfileProductsSide
              userId={id}
              currentCategoryUser={currentCategoryUser}
              currentCategory={currentCategory}
            />
          </div>
        </div>

        <div className="mt-auto self-end mr-[1rem] pb-[1rem]">
          <button
            onClick={handleLogOut}
            className="bg-white rounded-md p-[.5rem] shadow-md hover:scale-[1.02]"
          >
            <LogOut className="w-[3rem] h-[3rem] hover:scale-[1.02]" />
          </button>
        </div>
        <ProfileFooter userId={id} roles={roles} />
      </section>
    </>
  );
}
