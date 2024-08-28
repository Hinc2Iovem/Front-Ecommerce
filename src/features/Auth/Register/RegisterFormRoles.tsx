import UserLogo from "../../../assets/images/icon-arcade.svg";
import EditorLogo from "../../../assets/images/icon-advanced.svg";
import AdminLogo from "../../../assets/images/icon-pro.svg";

type AuthFormRolesProps = {
  currentForm: number;
  isValid: boolean;
  isMobile: boolean;
  setCurrentForm: React.Dispatch<React.SetStateAction<number>>;
  setChosenRole: React.Dispatch<React.SetStateAction<string>>;
  chosenRole: string;
};

export default function RegisterFormRoles({
  chosenRole,
  currentForm,
  isMobile,
  isValid,
  setChosenRole,
  setCurrentForm,
}: AuthFormRolesProps) {
  return (
    <div
      className={`${currentForm === 2 ? "flex" : "hidden"} ${
        isMobile ? "my-[10rem] z-[10]" : ""
      } flex-col bg-neutral-alabaster shadow-inner md:shadow-none w-fit gap-3 p-[2rem] rounded-xl md:relative md:h-full md:gap-[4rem]`}
    >
      <div className="md:mb-5 md:mt-[5rem] mb-[1rem] self-start">
        <h2 className="font-bold text-primary-marine-blue text-6xl">
          Select Your Role
        </h2>

        <p className="text-neutral-cool-gray md:whitespace-nowrap">
          User Role will be assigned by default.
        </p>
      </div>
      <div className="flex flex-col gap-[1rem] justify-between h-100%">
        <button
          type="button"
          onClick={() => setChosenRole("Customer")}
          className={`${
            chosenRole === "Customer"
              ? "border-primary-purplish-blue border-[2px]"
              : "border-neutral-400"
          } flex gap-3 items-center  border-[1px] px-[1rem] py-[1.5rem] rounded-xl hover:border-primary-purplish-blue`}
        >
          <img src={UserLogo} alt="Customer" />
          <h4 className="font-medium text-primary-marine-blue">Customer</h4>
        </button>
        <button
          type="button"
          onClick={() => setChosenRole("Seller")}
          className={`${
            chosenRole === "Seller"
              ? "border-primary-purplish-blue border-[2px]"
              : "border-neutral-400"
          } flex gap-3 items-center  border-[1px] px-[1rem] py-[1.5rem] rounded-xl hover:border-primary-purplish-blue`}
        >
          <img src={EditorLogo} alt="Seller" />
          <h4 className="font-medium text-primary-marine-blue">Seller</h4>
        </button>
        <button
          type="button"
          onClick={() => setChosenRole("Admin")}
          className={`${
            chosenRole === "Admin"
              ? "border-primary-purplish-blue border-[2px]"
              : "border-neutral-400"
          } flex gap-3 items-center  border-[1px] px-[1rem] py-[1.5rem] rounded-xl hover:border-primary-purplish-blue`}
        >
          <img src={AdminLogo} alt="Admin" />
          <h4 className="font-medium text-primary-marine-blue">Admin</h4>
        </button>
      </div>
      <div className="flex justify-between mt-[4rem]">
        <button
          onClick={() => setCurrentForm(1)}
          type="button"
          className="hover:border-neutral-500 border-transparent border-[2px] bg-transparent hover:text-black hover:font-medium text-neutral-cool-gray py-[1rem] px-[2.5rem] rounded-lg"
        >
          Go Back
        </button>

        <button
          type="submit"
          disabled={!isValid}
          className="hover:bg-primary-purplish-blue hover:text-white  bg-primary-marine-blue text-neutral-magnolia py-[1rem] px-[2.5rem] rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
