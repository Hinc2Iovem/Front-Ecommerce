import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../../api/axios";
import useAuth from "../../../hooks/Auth/useAuth";
import LoginFormCredentials from "./LoginFormCredentials";
import { InformativeModalTypes } from "../../shared/Modal/InformativeModal";

type AuthFormProps = {
  isMobile: boolean;
  setShowInformativeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setInformativeModalMessage: React.Dispatch<React.SetStateAction<string>>;
  setInformativeModalType: React.Dispatch<
    React.SetStateAction<InformativeModalTypes>
  >;
};

export default function LoginForm({
  isMobile,
  setInformativeModalMessage,
  setInformativeModalType,
  setShowInformativeModal,
}: AuthFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.pathname || "/shop";

  const canSubmit = [username, password].every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) {
      const loginObj = {
        username,
        password,
      };
      try {
        const res = await axiosPrivate.post("/auth", loginObj);
        setInformativeModalMessage("Logged in successefully");
        setInformativeModalType("success");
        setShowInformativeModal((prev) => !prev);
        const accessToken = res.data?.accessToken;
        setAuth({ accessToken });
        navigate(from, { replace: true });
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (!error.response) {
            setInformativeModalMessage("No Serve Response");
          } else if (error.response?.status === 400) {
            setInformativeModalMessage("Username or Password is missing");
          } else if (error.response?.status === 401) {
            setInformativeModalMessage("Wrong Username or Password");
          } else {
            setInformativeModalMessage("Something Went Wrong");
          }
          setInformativeModalType("error");
          setShowInformativeModal((prev) => !prev);
        }
      }
    } else {
      setInformativeModalMessage("You need to fill up data first");
      setInformativeModalType("error");
      setShowInformativeModal((prev) => !prev);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={`${
        isMobile
          ? ""
          : "justify-center relative top-0 w-auto px-20 bg-neutral-alabaster"
      } flex flex-col z-[100] w-full items-center`}
    >
      <LoginFormCredentials
        setUsername={setUsername}
        username={username}
        password={password}
        setPassword={setPassword}
        isMobile={isMobile}
      />
    </form>
  );
}
