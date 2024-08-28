import { ComponentProps } from "react";

type InputLabelGoesDownTypes<T> = {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  htmlFor: string;
  id: string;
  placeHolder: string;
  type: string;
  className?: string;
} & ComponentProps<"div">;

export default function InputLabelGoesDown<T>({
  value,
  setValue,
  htmlFor,
  id,
  placeHolder,
  className,
  type,
  ...props
}: InputLabelGoesDownTypes<T>) {
  return (
    <div {...props} className={`relative ${className}`}>
      <label
        htmlFor={htmlFor}
        className={`${
          value
            ? "opacity-100 transition-all top-[3.3rem] left-[2rem]"
            : "opacity-0 transition-all top-[1rem] left-[1rem]"
        }  absolute bg-white `}
      >
        {placeHolder}
      </label>
      <input
        className="w-full outline-neutral-grayish-blue border-neutral-grayish-blue border-[2px] p-[1rem] rounded-md text-gray-600 font-medium focus:border-[3px]"
        type={type}
        placeholder={placeHolder}
        id={id}
        value={value as unknown as string}
        onChange={(e) => {
          if (typeof value === "string") {
            setValue(e.target.value as unknown as T);
          } else if (typeof value === "number") {
            setValue(Number(e.target.value) as unknown as T);
          }
        }}
      />
    </div>
  );
}
