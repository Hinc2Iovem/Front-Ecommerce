import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosPublic } from "../../api/axios";
import useAuth from "../../hooks/Auth/useAuth";
import { userSchema, userSchemaTypes } from "../../models/Users";
import { RegisterOrLoginAlias } from "./Auth";
import AuthFormCredentials from "./AuthFormCredentials";
import AuthFormRoles from "./AuthFormRoles";

type AuthFormProps = {
  isMobile: boolean;
  registerOrLogin: RegisterOrLoginAlias;
  setRegisterOrLogin: React.Dispatch<
    React.SetStateAction<RegisterOrLoginAlias>
  >;
  setCurrentForm: React.Dispatch<React.SetStateAction<number>>;
  currentForm: number;
};

export default function AuthForm({
  isMobile,
  registerOrLogin,
  setRegisterOrLogin,
  currentForm,
  setCurrentForm,
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

  const [errMsg, setErrMsg] = useState("");
  const [chosenRole, setChosenRole] = useState("Customer");
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.pathname || "/shop";

  const onSubmit: SubmitHandler<userSchemaTypes> = async (data) => {
    if (isValid) {
      const path = registerOrLogin === "register" ? "/auth/register" : "/auth";
      const loginObj = {
        username: data.username,
        password: data.password,
      };
      const registerObj = {
        username: data.username,
        password: data.password,
        roles: [chosenRole],
      };
      try {
        const res = await axiosPublic.post(
          path,
          registerOrLogin === "register" ? registerObj : loginObj,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const accessToken = res.data?.accessToken;
        setAuth({ accessToken });
        navigate(from, { replace: true });
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (!error.response) {
            setErrMsg("No Serve Response");
          } else if (error.response?.status === 400) {
            setErrMsg("Username or Password is missing");
          } else if (error.response?.status === 401) {
            setErrMsg("Wrong Username or Password");
          } else {
            setErrMsg("Something Went Wrong");
          }
        }
      }
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
      <AuthFormCredentials
        isMobile={isMobile}
        registerOrLogin={registerOrLogin}
        setRegisterOrLogin={setRegisterOrLogin}
        currentForm={currentForm}
        errors={errors}
        register={register}
        setCurrentForm={setCurrentForm}
      />

      {registerOrLogin === "register" && (
        <AuthFormRoles
          chosenRole={chosenRole}
          currentForm={currentForm}
          isValid={isValid}
          isMobile={isMobile}
          setChosenRole={setChosenRole}
          setCurrentForm={setCurrentForm}
        />
      )}
    </form>
  );
}
