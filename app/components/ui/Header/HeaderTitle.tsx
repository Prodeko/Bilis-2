import type { ComponentProps } from "react";

import type { Season } from "@common/types";

type h1Props = ComponentProps<"h1">;

interface Props extends h1Props {
  title: string;
  currentSeason?: Season | null;
}

const HeaderTitle = async ({ title, currentSeason, ...props }: Props) => {
  return (
    <div {...props} className="flex flex-col pl-6">
      <h1 className="text-7xl font-bold text-neutral-200">{title}</h1>
      {currentSeason && (
        <h2 className="text-4xl text-neutral-400">{currentSeason.name}</h2>
      )}
    </div>
  );
};

export default HeaderTitle;
