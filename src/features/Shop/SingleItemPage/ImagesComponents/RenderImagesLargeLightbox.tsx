type RenderImagesLargeLightboxProps = {
  img: string;
  currentImg: number;
  index: number;
  changeImg: React.Dispatch<React.SetStateAction<number>>;
};
export default function RenderImagesLargeLightbox({
  img,
  currentImg,
  changeImg,
  index,
}: RenderImagesLargeLightboxProps) {
  return (
    <img
      src={img}
      className={`${
        currentImg === index ? "opacity-70" : "opacity-100"
      } cursor-pointer w-full`}
      onClick={() => changeImg(index)}
    />
  );
}
