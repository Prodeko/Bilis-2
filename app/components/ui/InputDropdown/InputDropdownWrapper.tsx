import type { ComponentProps, ReactNode } from "react";

type DivProps = ComponentProps<"div">;

interface Props extends DivProps {
  children: ReactNode;
}

export const InputDropdownWrapper = ({ children, ...props }: Props) => {
  return (
    <div
      className="relative z-10 flex max-h-full min-h-0 flex-col gap-1"
      {...props}
    >
      {children}
    </div>
  );
};
