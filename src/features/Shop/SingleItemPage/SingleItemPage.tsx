import { useState } from "react";

import Header from "../../Header/Header";
import LightBox from "../../shared/LightBox";
import InformativeModal from "../../shared/Modal/InformativeModal";
import SingleItemPageMain from "./SingleItemPageMain/SingleItemPageMain";

export default function SingleItemPage() {
  const [productAddedToCart, setProductAddedToCart] = useState(false);
  const [showInformativeModal, setShowInformativeModal] = useState(false);
  const [informativeModalType, setInformativeModalType] = useState<
    "info" | "error" | "success"
  >("info");
  const [informativeModalMessage, setInformativeModalMessage] = useState(
    "You need to Register first"
  );
  const [informativeModalLinkMessage, setInformativeModalLinkMessage] =
    useState("");

  const [isLightBox, setIsLightBox] = useState(false);
  const [value, setValue] = useState("");

  return (
    <>
      <Header
        setValue={setValue}
        showPillsOrNot={false}
        productAddedToCart={productAddedToCart}
      />

      <SingleItemPageMain
        isLightBox={isLightBox}
        setIsLightBox={setIsLightBox}
        setProductAddedToCart={setProductAddedToCart}
        setInformativeModalLinkMessage={setInformativeModalLinkMessage}
        setInformativeModalMessage={setInformativeModalMessage}
        setInformativeModalType={setInformativeModalType}
        setShowInformativeModal={setShowInformativeModal}
      />

      <LightBox isLightBox={isLightBox} setIsLightBox={setIsLightBox} />
      <InformativeModal
        closeOnClick={true}
        duration={1500}
        appearsFrom="bottom"
        positionX="right-[1rem]"
        positionY="bottom-[1rem]"
        type={informativeModalType}
        message={informativeModalMessage}
        setShowInformativeModal={setShowInformativeModal}
        showInformativeModal={showInformativeModal}
        linkMessage={informativeModalLinkMessage}
        linkPath="/auth"
      />
    </>
  );
}
