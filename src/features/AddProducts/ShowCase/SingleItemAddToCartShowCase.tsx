import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import FormatCurrency from "../../../utilities/FormatCurrency";

type SingleItemAddToCartShowCaseTypes = {
  price: number;
  productId: string;
};

export default function SingleItemAddToCartShowCase({
  price,
}: SingleItemAddToCartShowCaseTypes) {
  const [currentItemQty, setCurrentItemQty] = useState(0);

  const handleMinus = () => {
    setCurrentItemQty((prev) => {
      if (prev >= 1) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  };

  const handlePlus = () => {
    setCurrentItemQty((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    console.log("Later");
  };

  return (
    <div className="flex flex-col w-full">
      <h3 className="md:block hidden text-[3rem] font-medium mb-5">
        {FormatCurrency(price)}
      </h3>
      <div className="flex items-center md:flex-row flex-col gap-3 md:gap-7 w-full">
        <div className="flex bg-neutral-magnolia w-full md:w-[40%] justify-between items-center rounded-xl ">
          <button
            type="button"
            className="text-[2rem] p-[1rem] text-primary-orange outline-none border-none"
            onClick={handleMinus}
          >
            <Minus />
          </button>
          <div className="p-[1rem] font-medium">{currentItemQty}</div>
          <button
            type="button"
            className="p-[1rem] text-primary-orange outline-none border-none "
            onClick={handlePlus}
          >
            <Plus />
          </button>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="bg-primary-orange text-white shadow-primary-orange shadow-lg py-[1rem] w-full md:w-[60%] rounded-xl hover:opacity-90"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
