type RenderImagesLargeProps = {
  img: string;
  title: string;
  setIsLightBox: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function RenderImagesLarge({
  img,
  title,
  setIsLightBox,
}: RenderImagesLargeProps) {
  return (
    <img
      className={`rounded-xl max-h-[11.5rem] object-contain shadow-md shadow-neutral-dark-grayish-blue h-full hover:scale-[1.01] cursor-pointer transition-all`}
      src={img}
      alt={title}
      onClick={() => setIsLightBox(true)}
    />
  );
}
