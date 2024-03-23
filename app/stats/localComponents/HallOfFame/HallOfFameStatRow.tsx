import Link from "next/link";
import type { IconType } from "react-icons";

import type { HofPlayer } from "@common/types";
import { formatFullName } from "@common/utils/helperFunctions";

interface Props {
  statName: string;
  Icon: IconType;
  hofPlayer: HofPlayer;
}

export const HallOfFameStatRow = ({ statName, hofPlayer, Icon }: Props) => {
  return (
    <div className="flex w-full items-center justify-between gap-12 py-6">
      <div className="flex w-full min-w-0 items-center gap-5">
        <Icon className="shrink-0 text-primary-100" size={56} />
        <div className="flex w-full min-w-0 shrink flex-col items-start gap-1">
          <Link
            href={`/player/${hofPlayer.id}`}
            className="w-full truncate border border-transparent text-4xl font-medium text-neutral-50 transition-all duration-200 hover:border-neutral-50"
          >
            {formatFullName(hofPlayer, false, false)}
          </Link>
          <span className="w-full truncate text-2xl text-neutral-400">
            {statName}
          </span>
        </div>
      </div>
      <span className="text-4xl font-semibold text-primary-100">
        {hofPlayer.hofStat}
      </span>
    </div>
  );
};
