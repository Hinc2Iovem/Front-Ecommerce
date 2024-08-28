type RenderImagesProps = {
  image?: string;
  currentImg: number;
  currentIndex: number;
};

export default function RenderImagesShowCase({
  image,
  currentImg,
  currentIndex,
}: RenderImagesProps) {
  return (
    <>
      <img
        className={`${
          currentImg === currentIndex ? "opacity-100" : "opacity-0 hidden"
        } rounded-xl object-cover w-full shadow-md shadow-neutral-dark-grayish-blue p-3 transition-all cursor-pointer`}
        src={image}
      />
    </>
  );
}
