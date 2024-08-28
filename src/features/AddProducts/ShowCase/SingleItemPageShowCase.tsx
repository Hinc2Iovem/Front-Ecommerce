import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import characteristics from "../../../assets/images/SingleItemPage/characteristics.png";
import owner from "../../../assets/images/SingleItemPage/owner.png";
import { MATCHMEDIA } from "../../../const/MatchMedia";
import useMatchMedia from "../../../hooks/UI/useMatchMedia";
import SingleItemDescription from "../../Shop/SingleItemPage/Description/SingleItemDescription";
import RenderImagesLarge from "../../Shop/SingleItemPage/ImagesComponents/RenderImagesLarge";
import ShowImagesOnLightBox from "../../Shop/SingleItemPage/ImagesComponents/ShowImagesOnLightBox";
import ButtonHoverPromptModal from "../../shared/ButtonAsideHoverPromtModal/ButtonHoverPromptModal";
import LightBox from "../../shared/LightBox";
import RenderImagesShowCase from "./RenderImagesShowCase";
import SingleItemAddToCartShowCase from "./SingleItemAddToCartShowCase";
import SingleItemCharacteristicsShowCase from "./SingleItemCharacteristicsShowCase";

type SingleItemPageShowCaseTypes = {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  currentPage: string;
  preview: string | ArrayBuffer | null;
  price: string;
  brand: string;
  title: string;
  description: string;
  imgsPreview: string[] | ArrayBuffer | null;
  allMainTitles: string[];
  allSubTitles: string[][];
  allTexts: string[][];
};

export default function SingleItemPageShowCase({
  currentPage,
  setCurrentPage,
  preview,
  price,
  title,
  imgsPreview,
  description,
  allMainTitles,
  allSubTitles,
  allTexts,
  brand,
}: SingleItemPageShowCaseTypes) {
  const { productId } = useParams();
  const [currentImage, setCurrentImage] = useState(1);
  const [isLightBox, setIsLightBox] = useState(false);
  const mobile = useMatchMedia(MATCHMEDIA.Mobile);

  // @ts-expect-error Fuck This Stuff
  const allImgs = imgsPreview ? [preview, ...imgsPreview] : [""];

  const [showAdditionalInformation, setShowAdditionalInformation] =
    useState("");
  return (
    <>
      <div
        className={`bg-neutral-magnolia p-[1rem] ${
          currentPage === "result" ? "" : "hidden"
        }`}
      >
        <button
          onClick={() => setCurrentPage("form")}
          className="transition-all ml-auto self-end shadow-sm rounded-md p-[1rem] active:scale-[.97] bg-white hover:text-white hover:bg-primary-orange text-gray-700 font-medium"
        >
          Back To Form
        </button>

        <div className="flex flex-col bg-white max-w-[1110px] mx-auto my-[2rem] p-[3rem] gap-[2rem]">
          <div
            className={`bg-white items-center h-fit flex md:flex-row flex-col md:gap-[8rem] gap-3 rounded-lg relative`}
          >
            {!mobile ? (
              <div className="md:grid grid-cols-4 gap-6 hidden max-w-[35rem] min-w-[20rem]">
                <img
                  className={`col-[1/5] rounded-xl h-full object-cover w-full shadow-md shadow-neutral-dark-grayish-blue hover:scale-[1.01] cursor-pointer transition-all`}
                  src={preview as string}
                  alt={title}
                  onClick={() => setIsLightBox(true)}
                />
                {allImgs.map((img) => (
                  <RenderImagesLarge
                    key={img}
                    img={img}
                    title={"title"}
                    setIsLightBox={setIsLightBox}
                  />
                ))}
              </div>
            ) : (
              <div className="flex gap-6 max-w-[35rem] relative h-full transition-all ">
                {allImgs.map((img, i) => (
                  <RenderImagesShowCase
                    image={img}
                    key={img}
                    currentIndex={i + 1}
                    currentImg={currentImage}
                  />
                ))}
                <button
                  className="absolute top-[calc(50%-1.2rem)] left-[1rem] flex items-center justify-center w-[4rem] h-[4rem] bg-white rounded-full"
                  onClick={() =>
                    setCurrentImage((prev) => {
                      if (prev > 1) {
                        return prev - 1;
                      } else {
                        return 4;
                      }
                    })
                  }
                >
                  <ArrowLeftIcon />
                </button>
                <button
                  className="absolute top-[calc(50%-1.2rem)] flex items-center justify-center right-[1rem] w-[4rem] h-[4rem] bg-primary-orange text-white rounded-full"
                  onClick={() =>
                    setCurrentImage((prev) => {
                      if (prev >= 4) {
                        return 1;
                      } else {
                        return prev + 1;
                      }
                    })
                  }
                >
                  <ArrowRightIcon />
                </button>
              </div>
            )}
            <div className={` flex flex-col md:h-[60%] max-w-[50rem] w-full`}>
              <div>
                <SingleItemDescription
                  brand={brand}
                  description={description}
                  price={Number(price)}
                  title={title}
                />
                <SingleItemAddToCartShowCase
                  price={Number(price)}
                  productId={productId as string}
                />
              </div>
              {mobile && (
                <>
                  <div className="mt-[1.5rem] flex items-center gap-[2rem] justify-between">
                    <div className="flex items-center gap-[2rem]">
                      <button
                        className={`w-[5rem] h-[5rem] pl-[.5rem] bg-transparent shadow-md transition-all text-center active:scale-[0.98]`}
                        onClick={() => {
                          if (showAdditionalInformation === "characteristics") {
                            setShowAdditionalInformation("");
                          } else {
                            setShowAdditionalInformation("characteristics");
                          }
                        }}
                      >
                        <img
                          src={characteristics}
                          alt="characteristics"
                          className="w-full "
                        />
                      </button>
                      <button
                        className={`w-[5rem] h-[5rem] pl-[.5rem] bg-transparent shadow-md transition-all text-center active:scale-[0.98]`}
                        onClick={() => {
                          if (showAdditionalInformation === "sellerProducts") {
                            setShowAdditionalInformation("");
                          } else {
                            setShowAdditionalInformation("sellerProducts");
                          }
                        }}
                      >
                        <img
                          src={owner}
                          alt="More products"
                          className="w-full "
                        />
                      </button>
                    </div>
                  </div>
                  <SingleItemCharacteristicsShowCase
                    showAdditionalInformation={showAdditionalInformation}
                    allMainTitles={allMainTitles}
                    allSubTitles={allSubTitles}
                    allTexts={allTexts}
                  />
                </>
              )}
            </div>
          </div>

          {!mobile && (
            <>
              <div className="flex items-center justify-between gap-[2rem]">
                <div className="flex items-center gap-[2rem]">
                  <ButtonHoverPromptModal
                    contentName="Characteristics"
                    positionByAbscissa="left"
                    asideClasses="bottom-[-3.5rem]"
                    className={`w-[5rem] h-[5rem] pl-[.5rem] bg-transparent shadow-md transition-all text-center`}
                    variant={"rectangleWithShadow"}
                    onClick={() => {
                      if (showAdditionalInformation === "characteristics") {
                        setShowAdditionalInformation("");
                      } else {
                        setShowAdditionalInformation("characteristics");
                      }
                    }}
                  >
                    <img
                      src={characteristics}
                      alt="characteristics"
                      className="w-full "
                    />
                  </ButtonHoverPromptModal>
                  <ButtonHoverPromptModal
                    contentName={`More products from You`}
                    positionByAbscissa="left"
                    asideClasses="bottom-[-3.5rem]"
                    className={`w-[5rem] h-[5rem] pl-[.5rem] bg-transparent shadow-md transition-all text-center`}
                    variant={"rectangleWithShadow"}
                    onClick={() => {
                      if (showAdditionalInformation === "sellerProducts") {
                        setShowAdditionalInformation("");
                      } else {
                        setShowAdditionalInformation("sellerProducts");
                      }
                    }}
                  >
                    <img src={owner} alt="More products" className="w-full " />
                  </ButtonHoverPromptModal>
                </div>
              </div>
              <SingleItemCharacteristicsShowCase
                showAdditionalInformation={showAdditionalInformation}
                allMainTitles={allMainTitles}
                allSubTitles={allSubTitles}
                allTexts={allTexts}
              />
            </>
          )}
        </div>
      </div>

      <LightBox isLightBox={isLightBox} setIsLightBox={setIsLightBox} />

      <ShowImagesOnLightBox
        imgs={allImgs}
        isLightBox={isLightBox}
        setIsLightBox={setIsLightBox}
      />
    </>
  );
}
