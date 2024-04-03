import type { ComponentProps } from "react";
import type { IconType } from "react-icons";

type ButtonProps = ComponentProps<"button">;

interface PaginationButtonProps extends ButtonProps {
  Icon: IconType;
}

export const PaginationButton = ({ Icon, ...props }: PaginationButtonProps) => {
  return (
    <button
      type="button"
      {...props}
      className="flex cursor-pointer items-center justify-between border-none bg-none text-neutral-200 transition-all duration-200 hover:scale-105 hover:text-neutral-50 disabled:cursor-not-allowed disabled:text-neutral-500 disabled:hover:scale-100 disabled:hover:text-neutral-500"
    >
      <Icon size={24} />
    </button>
  );
};
