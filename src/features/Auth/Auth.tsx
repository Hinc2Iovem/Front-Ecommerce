import { useState } from "react";
import { MATCHMEDIA } from "../../const/MatchMedia";
import useMatchMedia from "../../hooks/UI/useMatchMedia";
import AuthForm from "./AuthForm";
import AuthSidebar from "./AuthSidebar";

export type RegisterOrLoginAlias = "register" | "login";

export default function Auth() {
  const isMobile = useMatchMedia(MATCHMEDIA.Mobile);
  const [registerOrLogin, setRegisterOrLogin] =
    useState<RegisterOrLoginAlias>("register");
  const [currentForm, setCurrentForm] = useState(1);

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
        <AuthSidebar
          isMobile={isMobile}
          registerOrLogin={registerOrLogin}
          currentForm={currentForm}
          setCurrentForm={setCurrentForm}
        />
        <main className="w-fit px-[1rem] mx-auto">
          <AuthForm
            setCurrentForm={setCurrentForm}
            currentForm={currentForm}
            setRegisterOrLogin={setRegisterOrLogin}
            registerOrLogin={registerOrLogin}
            isMobile={isMobile}
          />
        </main>
      </div>
    </section>
  );
}
