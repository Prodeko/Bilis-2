import { cva } from "class-variance-authority";

import useSeasonalMode from "@hooks/useSeasonalMode";

const labelStyles = cva(
  "absolute inset-0 cursor-pointer rounded-[34px] text-neutral-100 outline  outline-2  transition-all duration-300 before:absolute before:bottom-[4px] before:left-[4px] before:h-[26px] before:w-[26px] before:rounded-[50%] before:bg-white before:transition-all before:duration-300 before:content-['']",
  {
    variants: {
      seasonal: {
        true: "bg-sky-500 outline-sky-500 before:translate-x-[26px]",
        false: "outline-neutral-200",
      },
    },
  },
);

const SeasonToggle = () => {
  const { seasonal, toggleSeasonalMode } = useSeasonalMode();

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative inline-block h-[34px] w-[60px]">
        <input
          type="checkbox"
          id="toggle"
          className="pointer-events-none h-0 w-0 opacity-0 "
          checked={seasonal}
          onChange={toggleSeasonalMode}
        />
        <label htmlFor="toggle" className={labelStyles({ seasonal })} />
      </div>
      <span className="text-base text-white">Seasonal</span>
    </div>
  );
};

export default SeasonToggle;
