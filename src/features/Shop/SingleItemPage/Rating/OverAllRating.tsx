import { useEffect, useRef, useState } from "react";
import star from "../../../../assets/images/Shop/rating/star.png";

type OverAllRatingTypes = {
  rating: number;
};

export default function OverAllRating({ rating }: OverAllRatingTypes) {
  const numberRef = useRef<HTMLParagraphElement | null>(null);
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (numberRef.current) {
      setStyle({
        top: 27.5 - numberRef.current.clientHeight / 2,
        left: 27.5 - numberRef.current.clientWidth / 2,
      });
    }
  }, [numberRef.current?.clientHeight, numberRef.current?.clientWidth, rating]);

  return (
    <div className="relative w-[5.5rem] h-[5.5rem] ">
      <img src={star} alt="Star" />
      <p
        style={style}
        ref={numberRef}
        className="text-white text-[2rem] absolute font-medium self-center"
      >
        {rating}
      </p>
    </div>
  );
}
