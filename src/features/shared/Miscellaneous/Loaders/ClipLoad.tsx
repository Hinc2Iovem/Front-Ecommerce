import { ClipLoader } from "react-spinners";
import done from "../../../../assets/images/shared/verify.png";

type ClipLoadTypes = {
  conditionToStart: boolean;
  conditionToLoading: boolean;
  className: string;
};
export default function ClipLoad({
  conditionToStart,
  conditionToLoading,
  className,
}: ClipLoadTypes) {
  return (
    <div
      className={`absolute ${
        conditionToStart ? " rounded-full" : "hidden"
      } ${className} `}
    >
      {conditionToLoading ? (
        <ClipLoader
          aria-label="Loading Spinner"
          color="lightblue"
          size={25}
          speedMultiplier={0.8}
        />
      ) : (
        <img className="w-[3rem] h-[3rem]" src={done} alt="OK" />
      )}
    </div>
  );
}
