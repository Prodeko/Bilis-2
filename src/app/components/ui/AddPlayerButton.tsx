import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { FiUserPlus } from "react-icons/fi";

type ButtonProps = ComponentPropsWithoutRef<"a">;

interface Props extends ButtonProps {
  path: string;
  text: string;
}

export const AddPlayerButton = ({ path, text, ...props }: Props) => {
  return (
    <Link
      href={path}
      {...props}
      className="flex transform cursor-pointer items-center justify-center gap-2 rounded-lg border-none bg-primary-50 px-6 py-3 text-xl font-bold uppercase text-primary-700 transition-all duration-200 hover:-translate-y-1 hover:bg-white active:translate-y-0"
    >
      <span>{text}</span>
      <FiUserPlus />
    </Link>
  );
};
