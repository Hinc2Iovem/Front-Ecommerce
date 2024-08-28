import useMatchMedia from "../../../hooks/UI/useMatchMedia";
import { MATCHMEDIA } from "../../../const/MatchMedia";
import LoginSidebar from "./LoginSidebar";
import LoginForm from "./LoginForm";
import InformativeModal, {
  InformativeModalTypes,
} from "../../shared/Modal/InformativeModal";
import { useState } from "react";

export default function Login() {
  const [informativeModalType, setInformativeModalType] =
    useState<InformativeModalTypes>("success");
  const [informativeModalMessage, setInformativeModalMessage] = useState("");
  const [showInformativeModal, setShowInformativeModal] = useState(false);
  const isMobile = useMatchMedia(MATCHMEDIA.Mobile);

  return (
    <section
      className={`${
        isMobile ? "" : "justify-center items-center"
      } flex flex-col h-screen`}
    >
      <div
        className={`${
          isMobile
            ? "w-full"
            : "flex m-[1.5rem] bg-neutral-alabaster p-[1.5rem] max-w-[max-content]"
        } relative my-0 rounded-xl`}
      >
        <LoginSidebar isMobile={isMobile} />
        <main className="w-fit px-[1rem] mx-auto">
          <LoginForm
            isMobile={isMobile}
            setShowInformativeModal={setShowInformativeModal}
            setInformativeModalMessage={setInformativeModalMessage}
            setInformativeModalType={setInformativeModalType}
          />
        </main>
      </div>

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
      />
    </section>
  );
}
