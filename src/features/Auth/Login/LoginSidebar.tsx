import mobileBg from "../../../assets/images/bg-sidebar-mobile.svg";
import desktopBg from "../../../assets/images/bg-sidebar-desktop.svg";

type AuthSidebarProps = {
  isMobile: boolean;
};

export default function LoginSidebar({ isMobile }: AuthSidebarProps) {
  return (
    <div className={`${isMobile ? "fixed" : "flex relative flex-shrink-0 "}`}>
      {isMobile ? (
        <img
          src={mobileBg}
          className={`${isMobile ? "" : "w-auto"} w-screen `}
        />
      ) : (
        <img src={desktopBg} className="h-full" />
      )}

      <div
        className={`${
          isMobile ? "" : "flex-col"
        } flex z-[100] absolute top-[2rem] left-[2rem] gap-[1rem]`}
      >
        <div className="gap-[1rem] flex items-center">
          <div
            className={`rounded-full bg-primary-pastel-blue cursor-pointer 
             "opacity-100"
              text-black border-black border-[1px] py-3 px-6 flex items-center`}
          >
            1
          </div>
          <div className="whitespace-nowrap">
            <h4 className="uppercase text-white opacity-70">step 1</h4>
            <h4 className="uppercase text-white font-medium">Your Info</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
