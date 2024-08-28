import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type InformativeModal = {
  setShowInformativeModal: React.Dispatch<React.SetStateAction<boolean>>;
  showInformativeModal: boolean;
  duration?: number;
  closeOnClick: boolean;
  message: string;
  positionY: string;
  positionX: string;
  type: "info" | "error" | "success";
  appearsFrom: "left" | "right" | "top" | "bottom";
  linkMessage?: string;
  linkPath?: string;
};

export type InformativeModalTypes = "info" | "error" | "success";

export default function InformativeModal({
  showInformativeModal,
  setShowInformativeModal,
  duration = 3000,
  closeOnClick,
  message,
  positionX,
  positionY,
  type,
  appearsFrom,
  linkMessage,
  linkPath,
}: InformativeModal) {
  const [currentWidth, setCurrentWidth] = useState(100);
  const borderColor =
    type === "error"
      ? "text-red-500 border-red-400"
      : type === "success"
      ? "text-green-500 border-green-400"
      : "text-blue-300 border-blue-300";

  const progressBarColor =
    type === "error"
      ? "bg-red-400"
      : type === "success"
      ? "bg-green-400"
      : "bg-blue-300";

  const from =
    appearsFrom === "bottom"
      ? `bottom-[-200%] ${positionX}`
      : appearsFrom === "left"
      ? `left-[-200%] ${positionY}`
      : appearsFrom === "right"
      ? `right-[-200%] ${positionY}`
      : `top-[-200%] ${positionX}`;

  useEffect(() => {
    if (showInformativeModal) {
      const interval = setInterval(() => {
        setCurrentWidth((prev) => {
          const newWidth = prev - 100 / (duration / 50);
          if (newWidth <= 0) {
            clearInterval(interval);
            setShowInformativeModal(false);
            return 0;
          }
          return newWidth;
        });
      }, 50);

      return () => {
        clearInterval(interval);
      };
    }
  }, [showInformativeModal, duration, setShowInformativeModal]);

  useEffect(() => {
    setCurrentWidth(100);
  }, [showInformativeModal]);

  const handleClose = () => {
    if (closeOnClick) {
      setCurrentWidth(0);
      setShowInformativeModal(false);
    }
  };

  return (
    <aside
      onClick={handleClose}
      className={`bg-white ${
        showInformativeModal ? `${positionX} ${positionY}` : `${from}`
      } transition-all border-[3px] border-b-0 border-dashed ${borderColor} fixed w-[25rem] h-[8rem] rounded-md shadow-md z-10`}
    >
      <div
        style={{
          width: `${currentWidth}%`,
        }}
        className={`absolute h-[3px] ${progressBarColor} bottom-0 rounded-b-md`}
      ></div>
      <div className="p-[1rem] flex flex-col">
        <h3>{message}</h3>
        {linkMessage && <Link to={`${linkPath}`}>{linkMessage}</Link>}
      </div>
    </aside>
  );
}
