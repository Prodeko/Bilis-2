import type { ComponentProps } from "react";

export const PaginationInput = ({ ...props }: ComponentProps<"input">) => {
  return (
    <input
      {...props}
      type="number"
      className="h-14 w-14 rounded-lg border-2 border-neutral-600 bg-neutral-100 text-center text-3xl font-medium text-neutral-800"
    />
  );
};
