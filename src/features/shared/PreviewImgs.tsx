import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import plus from "../../assets/images/shared/plus.png";

type PreviewImage = {
  setImgsPreview: React.Dispatch<
    React.SetStateAction<string[] | ArrayBuffer | null>
  >;
  imagePreview: string | ArrayBuffer | null;
  divClasses?: string;
  currentIndex?: number;
  children?: React.ReactNode;
};

export default function PreviewImgs({
  setImgsPreview,
  imagePreview,
  divClasses,
  currentIndex,
  children,
}: PreviewImage) {
  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      const file = new FileReader();

      file.onload = function () {
        setImgsPreview((prevState) => {
          if (prevState === null) {
            return file.result as ArrayBuffer | null;
          } else if (Array.isArray(prevState)) {
            const newImages = [...prevState];
            newImages[currentIndex ? currentIndex : 0] = file.result as string;
            return newImages;
          } else {
            return prevState;
          }
        });
      };

      file.readAsDataURL(acceptedFiles[0]);
    },
    [setImgsPreview, currentIndex]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer ${divClasses ? divClasses : ""}`}
    >
      <input type="file" name="Image" id="image" {...getInputProps()} />
      <img
        src={imagePreview ? (imagePreview as string) : plus}
        alt="addImage"
        className={`${
          imagePreview
            ? "w-full h-full object-contain"
            : "absolute w-[3.5rem] h-[3.5rem] left-[calc(50%-1.75rem)] top-[calc(50%-1.75rem)]"
        }`}
      />
      {children ? children : ""}
    </div>
  );
}
