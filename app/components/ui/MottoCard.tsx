import { cva } from "class-variance-authority";
import type { ComponentProps } from "react";

type DivProps = ComponentProps<"div">;

interface Props extends DivProps {
  text: string;
  author: string;
  switching: boolean; // Determines if the motto is switching to another or not
}

const styles = cva(
  "flex w-full flex-col gap-1.5 rounded-2xl bg-gradient-to-tr from-neutral-200 to-neutral-100 p-8 shadow-lg",
  {
    variants: {
      switching: {
        true: "animate-push-in-right",
      },
    },
  },
);

export const MottoCard = ({ text, author, switching, ...props }: Props) => {
  return (
    <div {...props} className={styles({ switching })}>
      <span className="text-2xl font-bold text-neutral-900">{text}</span>
      <span className="text-md font-medium italic text-primary-600">
        - {author}
      </span>
    </div>
  );
};
