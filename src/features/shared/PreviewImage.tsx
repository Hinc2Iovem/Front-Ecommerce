import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import plus from "../../assets/images/shared/plus.png";

type PreviewImage = {
  setPreview: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
  imagePreview: string | ArrayBuffer | null;
  divClasses?: string;
  children?: React.ReactNode;
};

export default function PreviewImage({
  setPreview,
  imagePreview,
  divClasses,
  children,
}: PreviewImage) {
  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      const file = new FileReader();

      file.onload = function () {
        setPreview(file.result);
      };

      file.readAsDataURL(acceptedFiles[0]);
    },
    [setPreview]
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
