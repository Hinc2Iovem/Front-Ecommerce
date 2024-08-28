import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../../api/axios";
import useAuth from "../../../hooks/Auth/useAuth";
import { userSchema, userSchemaTypes } from "../../../models/Users";
import RegisterFormCredentials from "./RegisterFormCredentials";
import RegisterFormRoles from "./RegisterFormRoles";
import { InformativeModalTypes } from "../../shared/Modal/InformativeModal";

type AuthFormProps = {
  isMobile: boolean;
  setCurrentForm: React.Dispatch<React.SetStateAction<number>>;
  currentForm: number;
  setShowInformativeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setInformativeModalMessage: React.Dispatch<React.SetStateAction<string>>;
  setInformativeModalType: React.Dispatch<
    React.SetStateAction<InformativeModalTypes>
  >;
};

export default function RegisterForm({
  currentForm,
  isMobile,
  setCurrentForm,
  setInformativeModalMessage,
  setInformativeModalType,
  setShowInformativeModal,
}: AuthFormProps) {
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm<userSchemaTypes>({
    resolver: zodResolver(userSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const [chosenRole, setChosenRole] = useState("Customer");
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.pathname || "/shop";

  const onSubmit: SubmitHandler<userSchemaTypes> = async (data) => {
    if (isValid) {
      const registerObj = {
        username: data.username,
        password: data.password,
        roles: [chosenRole],
      };
      try {
        const res = await axiosPrivate.post("/auth/register", registerObj);
        const accessToken = res.data?.accessToken;
        setAuth({ accessToken });
        setInformativeModalMessage("Signed up successefully");
        setInformativeModalType("success");
        setShowInformativeModal((prev) => !prev);
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
      onSubmit={handleSubmit(onSubmit)}
      className={`${
        isMobile
          ? ""
          : "justify-center relative top-0 w-auto px-20 bg-neutral-alabaster"
      } flex flex-col z-[100] w-full items-center`}
    >
      <RegisterFormCredentials
        isMobile={isMobile}
        currentForm={currentForm}
        errors={errors}
        register={register}
        setCurrentForm={setCurrentForm}
      />
      <RegisterFormRoles
        chosenRole={chosenRole}
        currentForm={currentForm}
        isValid={isValid}
        isMobile={isMobile}
        setChosenRole={setChosenRole}
        setCurrentForm={setCurrentForm}
      />
    </form>
  );
}
