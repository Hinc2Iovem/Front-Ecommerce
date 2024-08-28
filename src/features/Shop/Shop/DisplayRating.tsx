import star from "../../../assets/images/Shop/rating/star.png";
import halfStar from "../../../assets/images/Shop/rating/halfStar.png";
import zeroStar from "../../../assets/images/Shop/rating/zeroStar.png";

export default function DisplayRating({ rating }: { rating: number }) {
  const calculateAmountOfStars = () => {
    const ratingStars = [];
    let remainingRating = rating;

    for (let i = 1; i <= 5; i++) {
      if (remainingRating >= 1) {
        ratingStars.push(<DisplayOne key={i} />);
        remainingRating -= 1;
      } else if (remainingRating === 0.5) {
        ratingStars.push(<DisplayHalf key={i} />);
        remainingRating -= 0.5;
      } else {
        ratingStars.push(<DisplayZero key={i} />);
      }
    }

    return ratingStars;
  };

  return (
    <div className="absolute left-[1rem] top-[.5rem] flex items-center">
      {calculateAmountOfStars()}
    </div>
  );
}

function DisplayZero() {
  return <img src={zeroStar} alt="zero" className="w-[2rem]" />;
}
function DisplayHalf() {
  return <img src={halfStar} alt="half" className="w-[2rem]" />;
}
function DisplayOne() {
  return <img src={star} alt="one" className="w-[2rem]" />;
}
