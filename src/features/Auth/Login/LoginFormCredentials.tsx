import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type AuthFormCredentialsTypes = {
  isMobile: boolean;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  password: string;
};

export default function LoginFormCredentials({
  isMobile,
  password,
  setPassword,
  setUsername,
  username,
}: AuthFormCredentialsTypes) {
  const [showPwd, setShowPwd] = useState(false);
  return (
    <div
      className={`${
        isMobile ? "z-[10] my-[10rem]" : "shadow-none w-fit relative h-full"
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
          aria-describedby="uidnote"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
              aria-describedby="pwdnote"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPwd((prev) => !prev)}
              className="absolute right-[1rem] top-1/4 cursor-pointer hover:text-gray-700 active:scale-[0.98] hover:scale-[1.02] transition-all"
            >
              {showPwd ? <Eye /> : <EyeOff />}
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className={` hover:bg-primary-purplish-blue hover:text-white self-end mt-[2rem]  bottom-0 bg-primary-marine-blue text-neutral-magnolia py-[1rem] px-[2.5rem] rounded-lg`}
      >
        Submit
      </button>

      <div>
        <h4>Do not have an account?</h4>
        <Link
          to={"/auth/register"}
          className="hover:text-primary-purplish-blue text-[2rem]"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
