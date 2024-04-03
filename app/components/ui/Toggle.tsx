import { cva } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";

const labelStyles = cva(
  "absolute inset-0 cursor-pointer rounded-[34px] text-neutral-100 outline  outline-2  transition-all duration-300 before:absolute before:bottom-[4px] before:left-[4px] before:h-[26px] before:w-[26px] before:rounded-[50%] before:bg-white before:transition-all before:duration-300 before:content-['']",
  {
    variants: {
      on: {
        true: "bg-sky-500 outline-sky-500 before:translate-x-[26px]",
        false: "outline-neutral-200",
      },
    },
  },
);

interface Props extends ComponentPropsWithoutRef<"input"> {
  on: boolean;
}

export const Toggle = ({ on, ...props }: Props) => {
  return (
    <div {...props} className="flex flex-col items-center gap-3">
      <div className="relative inline-block h-[34px] w-[60px]">
        <input
          {...props}
          type="checkbox"
          id="toggle"
          className="pointer-events-none h-0 w-0 opacity-0 "
          checked={on}
        />
        <label htmlFor="toggle" className={labelStyles({ on })} />
      </div>
      <span className="text-base text-white">Seasonal</span>
    </div>
  );
};
