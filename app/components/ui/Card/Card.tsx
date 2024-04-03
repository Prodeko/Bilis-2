import type { ComponentProps, ReactNode } from "react";

export type CardProps = ComponentProps<"div">;

interface Props extends CardProps {
  children: ReactNode;
}

export const Card = ({ children, ...props }: Props) => {
  return (
    <div {...props} className="h-full rounded-2xl bg-neutral-800">
      {children}
    </div>
  );
};
