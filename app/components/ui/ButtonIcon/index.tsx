import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentProps } from "react";
import type { IconType } from "react-icons";

const buttonStyles = cva(
  "transition-aa flex cursor-pointer items-center justify-center border-none bg-transparent duration-200 hover:scale-125",
  {
    variants: {
      intent: {
        destructive: "hover:text-danger:500 text-danger-600 ",
      },
    },
  },
);

export const iconStyles = cva("", {
  variants: {
    sizing: {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-8 w-8",
    },
  },
});

export type ButtonProps = ComponentProps<"button">;

interface Props
  extends ButtonProps,
    VariantProps<typeof buttonStyles>,
    VariantProps<typeof iconStyles> {
  Icon: IconType;
}

export const ButtonIcon = ({ Icon, intent, sizing, ...props }: Props) => {
  return (
    <button {...props} type={props.type} className={buttonStyles({ intent })}>
      <Icon className={iconStyles({ sizing })} />
    </button>
  );
};
