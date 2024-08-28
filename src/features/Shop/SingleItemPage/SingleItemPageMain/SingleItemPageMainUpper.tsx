import Rating from "../Rating/Rating";

type SingleItemPageMainUpper = {
  category: string;
  productId: string;
  mobile: boolean;
  rating: number;
  setInformativeModalLinkMessage: React.Dispatch<React.SetStateAction<string>>;
  setOverAllRating: React.Dispatch<React.SetStateAction<number>>;
  setShowInformativeModal: React.Dispatch<React.SetStateAction<boolean>>;
  subCategory: string;
  userId: string | undefined;
};

export default function SingleItemPageMainUpper({
  category,
  subCategory,
  rating,
  productId,
  userId,
  mobile,
  setShowInformativeModal,
  setOverAllRating,
  setInformativeModalLinkMessage,
}: SingleItemPageMainUpper) {
  return (
    <div className="flex w-full mx-auto max-w-[1110px] items-baseline justify-between relative">
      <ul className="flex mt-[2rem] mb-[0rem] items-center gap-[1rem] ">
        <li className="px-[1rem] py-[.5rem] rounded-md text-black bg-white text-[1.8rem] font-medium w-fit">
          {category}
        </li>
        <li className="px-[1rem] py-[.5rem] rounded-md text-black bg-white text-[1.8rem] font-medium w-fit">
          {subCategory}
        </li>
      </ul>
      <Rating
        setShowInformativeModal={setShowInformativeModal}
        rating={rating}
        productId={productId}
        userId={userId ?? ""}
        mobile={mobile}
        setOverAllRating={setOverAllRating}
        setInformativeModalLinkMessage={setInformativeModalLinkMessage}
      />
    </div>
  );
}
