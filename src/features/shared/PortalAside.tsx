import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const portalStyles = cva(["p-[1.5rem] rounded-xl"], {
  variants: {
    variant: {
      danger: ["bg-red-500", "hover:bg-red-400"],
      success: ["bg-green-500", "hover:bg-green-400"],
    },
  },
  defaultVariants: {
    variant: "success",
  },
});

type PortalAsideProps = VariantProps<typeof portalStyles> &
  ComponentProps<"aside">;

export default function PortalAside({
  variant,
  className,
  ...props
}: PortalAsideProps) {
  return (
    <aside
      {...props}
      className={twMerge(portalStyles({ variant }), className)}
    ></aside>
  );
}
