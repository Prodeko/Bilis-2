import type { ComponentProps, ReactNode } from "react";

type DivProps = ComponentProps<"div">;

interface Props extends DivProps {
  title: string;
  children: ReactNode;
}

export const Title = ({ title }: { title: string }) => {
  return <h2 className="w-fit text-4xl font-semibold">{title}</h2>;
};

export const TitleRow = ({ children, title, ...props }: Props) => {
  return (
    <div
      {...props}
      className="flex max-h-full min-h-0 items-center justify-between gap-3 px-6 text-3xl font-semibold text-neutral-50"
    >
      <Title title={title} />
      {children}
    </div>
  );
};
