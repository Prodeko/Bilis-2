import type { IconType } from "react-icons";

import { Card } from "@ui/Card";

import type { ProfileStatistic } from "@common/types";

type Props = ProfileStatistic & {
  Icon: IconType;
};

const ProfileStat = ({ label, Icon, subStatistics }: Props) => {
  return (
    <Card>
      <div className="flex flex-col gap-4 p-8">
        <h2 className="flex items-center justify-between text-4xl font-bold text-neutral-300">
          {label} <Icon />
        </h2>
        <div className="flex flex-col gap-1">
          {subStatistics.map(({ label, value }) => (
            <p
              key={label}
              className="w-full truncate text-xl font-medium text-neutral-400"
            >
              {label}: {value}
            </p>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProfileStat;
