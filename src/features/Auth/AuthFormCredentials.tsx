import { FieldErrors, UseFormRegister } from "react-hook-form";
import { RegisterOrLoginAlias } from "./Auth";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type AuthFormCredentialsTypes = {
  isMobile: boolean;
  registerOrLogin: RegisterOrLoginAlias;
  setRegisterOrLogin: React.Dispatch<
    React.SetStateAction<RegisterOrLoginAlias>
  >;
  currentForm: number;
  setCurrentForm: React.Dispatch<React.SetStateAction<number>>;
  register: UseFormRegister<{
    username: string;
    password: string;
    confirmPassword: string;
  }>;
  errors: FieldErrors<{
    username: string;
    password: string;
    confirmPassword: string;
  }>;
};

export default function AuthFormCredentials({
  isMobile,
  registerOrLogin,
  setRegisterOrLogin,
  currentForm,
  errors,
  register,
  setCurrentForm,
}: AuthFormCredentialsTypes) {
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  return (
    <div
      className={`${
        isMobile ? "z-[10] my-[10rem]" : "shadow-none w-fit relative h-full"
      } ${
        currentForm === 1 ? "" : "hidden"
      } flex flex-col bg-neutral-alabaster shadow-inner gap-3 p-[2rem] rounded-xl`}
    >
      <div
        className={`${isMobile ? "" : "mb-5 mt-[5rem] "} mb-[1rem] self-start`}
      >
        <h2 className="font-bold text-primary-marine-blue text-6xl">
          Personal Info
        </h2>
        <p
          className={`${
            isMobile ? "" : "whitespace-nowrap"
          }  text-neutral-cool-gray `}
        >
          Please provide your username and password.
        </p>
      </div>

      <div
        className={`flex flex-col gap-[.2rem] sm:w-full w-[26rem] mx-auto sm:mx-0`}
      >
        <label
          htmlFor="username"
          className="text-primary-marine-blue font-normal text-[2rem] "
        >
          Username
        </label>

        <input
          id="username"
          className="p-3 text-[2rem] rounded-xl outline-none border-[1px] border-black"
          type="text"
          placeholder="Hinc2Iovem"
          {...register("username")}
          aria-describedby="uidnote"
        />
        {errors.username && (
          <span
            id="uidnote"
            className={`${
              registerOrLogin === "register" ? "" : "hidden"
            } text-red-500 font-medium text-[1.2rem]`}
          >
            {errors.username?.message}
          </span>
        )}
        <div className="w-full relative">
          <label
            htmlFor="password"
            className="text-primary-marine-blue font-normal text-[2rem]"
          >
            Password
          </label>
          <div className="relative w-full">
            <input
              id="password"
              className="p-3 text-[2rem] rounded-xl outline-none border-[1px] border-black w-full"
              type={`${showPwd ? "text" : "password"}`}
              placeholder="Very Strong Password"
              {...register("password")}
              aria-describedby="pwdnote"
            />
            <button
              type="button"
              onClick={() => setShowPwd((prev) => !prev)}
              className="absolute right-[1rem] top-1/4 cursor-pointer hover:text-gray-700 active:scale-[0.98] hover:scale-[1.02] transition-all"
            >
              {showPwd ? <Eye /> : <EyeOff />}
            </button>
          </div>

          {errors.password && (
            <span
              id="pwdnote"
              className={`${
                registerOrLogin === "register" ? "" : "hidden"
              } text-red-500 font-medium text-[1.2rem]`}
            >
              {errors.password?.message}
            </span>
          )}
        </div>
        <div
          className={`${
            registerOrLogin === "register" ? "" : "hidden"
          } w-full relative`}
        >
          <label
            htmlFor="confirmPassword"
            className="text-primary-marine-blue font-normal text-[2rem]"
          >
            Confirm Password
          </label>
          <div className="relative w-full">
            <input
              id="confirmPassword"
              className="p-3 text-[2rem] rounded-xl  outline-none border-[1px] border-black w-full"
              type={`${showConfirmPwd ? "text" : "password"}`}
              placeholder="Very Strong Password"
              {...register("confirmPassword")}
              aria-describedby="confirmnote"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPwd((prev) => !prev)}
              className="absolute right-[1rem] top-1/4 cursor-pointer hover:text-gray-700 active:scale-[0.98] hover:scale-[1.02] transition-all"
            >
              {showConfirmPwd ? <Eye /> : <EyeOff />}
            </button>
          </div>
          {errors.confirmPassword && (
            <span
              id="confirmnote"
              className={`${
                registerOrLogin === "register" ? "" : "hidden"
              } text-red-500 font-medium text-[1.2rem]`}
            >
              {errors.confirmPassword?.message}
            </span>
          )}
        </div>
      </div>

      {registerOrLogin === "register" && (
        <button
          onClick={() => setCurrentForm(2)}
          type="button"
          className={`${
            currentForm === 1 ? "" : "hidden"
          } hover:bg-primary-purplish-blue hover:text-white self-end mt-[2rem]  bottom-0 bg-primary-marine-blue text-neutral-magnolia py-[1rem] px-[2.5rem] rounded-lg`}
        >
          Next Step
        </button>
      )}

      <button
        type="submit"
        className={`${
          registerOrLogin === "register" && currentForm === 1 ? "hidden" : ""
        } hover:bg-primary-purplish-blue hover:text-white self-end mt-[2rem] bottom-0 bg-primary-marine-blue text-neutral-magnolia py-[1rem] px-[2.5rem] rounded-lg`}
      >
        Submit
      </button>

      <div>
        <h4>Do not have an account?</h4>
        <button
          type="button"
          onClick={() => {
            if (registerOrLogin === "login") {
              setRegisterOrLogin("register");
            } else {
              setRegisterOrLogin("login");
            }
          }}
          className="hover:text-primary-purplish-blue text-[2rem]"
        >
          {registerOrLogin === "login" ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </div>
  );
}
