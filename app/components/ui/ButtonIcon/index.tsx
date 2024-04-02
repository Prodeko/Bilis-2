import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentProps } from "react";
import type { IconType } from "react-icons";

const buttonStyles = cva(
  "flex items-center justify-center border-none bg-transparent transition-all duration-200 hover:scale-125 hover:cursor-pointer",
);

export const iconStyles = cva("", {
  variants: {
    sizing: {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-8 w-8",
    },
    intent: {
      primary:
        "stroke-neutral-600 hover:stroke-neutral-700 active:stroke-neutral-800",
      destructive:
        "stroke-danger-600 hover:stroke-danger-500 active:stroke-danger-400",
      success:
        "stroke-success-600 hover:stroke-success-500 active:stroke-success-400",
      warning:
        "stroke-warning-600 hover:stroke-warning-500 active:stroke-warning-400",
    },
  },
});

export type ButtonProps = ComponentProps<"button">;

interface Props extends ButtonProps, VariantProps<typeof iconStyles> {
  Icon: IconType;
}

export const ButtonIcon = ({ Icon, intent, sizing, ...props }: Props) => {
  return (
    <button {...props} type={props.type} className={buttonStyles()}>
      <Icon className={iconStyles({ sizing, intent })} />
    </button>
  );
};
