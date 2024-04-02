import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentProps } from "react";
import type { IconType } from "react-icons";

export type ButtonProps = ComponentProps<"button">;
type Variation = "destructive";

const styles = cva(
  "flex items-center justify-center gap-2 rounded-md border-none px-5 py-3 text-base font-semibold text-white transition-all hover:cursor-pointer",
  {
    variants: {
      intent: {
        destructive: "bg-danger-700 hover:bg-danger-600 active:bg-danger-500",
      },
    },
  },
);

interface Props extends ButtonProps, VariantProps<typeof styles> {
  variation: Variation;
  text?: string;
  Icon?: IconType;
}

export const Button = ({ text, intent, Icon, ...props }: Props) => {
  return (
    <button {...props} type={props.type} className={styles({ intent })}>
      {text && <span>{text}</span>}
      {Icon && (
        <span className="flex items-center justify-center">
          <Icon />
        </span>
      )}
    </button>
  );
};
