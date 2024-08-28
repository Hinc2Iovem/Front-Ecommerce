import { ClipLoader } from "react-spinners";

export default function ShopItemPreload() {
  return (
    <div className="flex flex-col shadow-md gap-3 bg-white p-3 rounded-xl justify-between relative h-[60rem] max-w-full min-w-[30rem] ">
      <div className="h-[48%] w-full shadow-sm shadow-gray-400 rounded-md"></div>
      <div className="w-[50%] h-[3rem] shadow-sm shadow-gray-400 rounded-md"></div>
      <div className="w-full h-[22%] shadow-sm shadow-gray-400 rounded-md"></div>
      <div className="my-[2rem] w-[35%] h-[2rem] shadow-sm shadow-gray-400 rounded-md"></div>
      <div className="w-full flex gap-[1rem]">
        <div className="w-[10%] h-[4rem] shadow-sm shadow-gray-400 rounded-md"></div>
        <div className="w-[85%] h-[4rem] shadow-sm shadow-gray-400 rounded-md"></div>
        <ClipLoader className="absolute top-[1rem] right-[1rem]" size={20} />
      </div>
    </div>
  );
}
