import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

export type CardProps = ComponentProps<"div">;

const styles = cva("h-full rounded-2xl bg-neutral-800", {
  variants: {
    tableGrid: {
      true: "grid grid-rows-[auto_minmax(0,_1fr)] gap-y-3 py-6",
    },
  },
});

interface Props extends CardProps, VariantProps<typeof styles> {
  children: ReactNode;
}

export const Card = ({ children, tableGrid, ...props }: Props) => {
  return (
    <div {...props} className={styles({ tableGrid })}>
      {children}
    </div>
  );
};
