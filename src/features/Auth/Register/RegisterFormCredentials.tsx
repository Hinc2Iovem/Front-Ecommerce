import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Link } from "react-router-dom";

type AuthFormCredentialsTypes = {
  isMobile: boolean;

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

export default function RegisterFormCredentials({
  currentForm,
  errors,
  isMobile,
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
            className={` text-red-500 font-medium text-[1.2rem]`}
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
              className={` text-red-500 font-medium text-[1.2rem]`}
            >
              {errors.password?.message}
            </span>
          )}
        </div>
        <div className={` w-full relative`}>
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
              className={` text-red-500 font-medium text-[1.2rem]`}
            >
              {errors.confirmPassword?.message}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => setCurrentForm(2)}
        type="button"
        className={`${
          currentForm === 1 ? "" : "hidden"
        } hover:bg-primary-purplish-blue hover:text-white self-end mt-[2rem]  bottom-0 bg-primary-marine-blue text-neutral-magnolia py-[1rem] px-[2.5rem] rounded-lg`}
      >
        Next Step
      </button>

      <div>
        <h4>Already have an account?</h4>
        <Link
          to={"/auth"}
          className="hover:text-primary-purplish-blue text-[2rem]"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
