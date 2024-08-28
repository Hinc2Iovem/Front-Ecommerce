import { useEffect, useRef, useState } from "react";
import halfStar from "../../../../assets/images/Shop/rating/halfStar.png";
import star from "../../../../assets/images/Shop/rating/star.png";
import zeroStar from "../../../../assets/images/Shop/rating/zeroStar.png";
import useUpdateRating from "../../../../hooks/Rating/useUpdateRating";

type RatingTypes = {
  rating: number;
  productId: string;
  userId: string;
  mobile: boolean;
  setOverAllRating: React.Dispatch<React.SetStateAction<number>>;
  setShowInformativeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setInformativeModalLinkMessage: React.Dispatch<React.SetStateAction<string>>;
};

export default function Rating({
  rating,
  productId,
  userId,
  mobile,
  setOverAllRating,
  setShowInformativeModal,
  setInformativeModalLinkMessage,
}: RatingTypes) {
  const updateRating = useUpdateRating();
  const [currentRating, setCurrentRating] = useState(rating);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const ratingDivRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (newRating: number) => {
    if (userId) {
      setCurrentRating(newRating);
      updateRating({ rating: newRating, productId, userId }).then((r) => {
        if (r) {
          setOverAllRating(r);
        }
      });
    } else {
      setInformativeModalLinkMessage("Register");
      setShowInformativeModal((prev) => !prev);
    }
  };

  const handleMouseEnter = (rating: number) => {
    setHoverRating(rating);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ratingDivRef.current) {
      const rect = ratingDivRef.current.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        setHoverRating(null);
      }
    }
  };

  useEffect(() => {
    const divRef = ratingDivRef.current;
    if (divRef) {
      const handleDivMouseLeave = (e: MouseEvent) => {
        const rect = divRef.getBoundingClientRect();
        if (
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        ) {
          setHoverRating(null);
        }
      };

      divRef.addEventListener("mouseleave", handleDivMouseLeave);
      return () => {
        divRef.removeEventListener("mouseleave", handleDivMouseLeave);
      };
    }
  }, []);

  const calculateAmountOfStars = () => {
    const ratingStars = [];
    const effectiveRating = hoverRating !== null ? hoverRating : currentRating;

    for (let i = 5; i > 0; i--) {
      if (i <= effectiveRating) {
        ratingStars.push(
          <DisplayOne
            key={i}
            onClick={() => handleClick(i)}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
          />
        );
      } else if (i - 0.5 === effectiveRating) {
        ratingStars.push(
          <DisplayHalf
            key={i}
            onClick={() => handleClick(i - 0.5)}
            onMouseEnter={() => handleMouseEnter(i - 0.5)}
            onMouseLeave={handleMouseLeave}
          />
        );
      } else {
        ratingStars.push(
          <DisplayZero
            key={i}
            onClick={() => handleClick(i)}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
          />
        );
      }
    }

    return ratingStars;
  };

  return (
    <div
      ref={ratingDivRef}
      className={`${
        mobile ? "translate-y-[5rem] z-[1] -translate-x-1" : ""
      } flex items-center gap-[.5rem] w-fit h-fit`}
    >
      {calculateAmountOfStars()}
    </div>
  );
}

type DisplayTypes = {
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function DisplayZero({ onClick, onMouseEnter, onMouseLeave }: DisplayTypes) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img src={zeroStar} alt="zero" className="w-[2.5rem]" />
    </button>
  );
}

function DisplayHalf({ onClick, onMouseEnter, onMouseLeave }: DisplayTypes) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img src={halfStar} alt="half" className="w-[2.5rem]" />
    </button>
  );
}

function DisplayOne({ onClick, onMouseEnter, onMouseLeave }: DisplayTypes) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img src={star} alt="one" className="w-[2.5rem]" />
    </button>
  );
}
