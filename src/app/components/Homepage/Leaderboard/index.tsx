import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";

import { Card, type CardProps } from "@ui/Card";
import { Table, leaderboardColumns, prepareLeaderboardData } from "@ui/Table";
import { TitleRow } from "@ui/TitleRow";

import type { Player } from "@common/types";

interface Props {
  leaderboard: Player[];
  cardProps: CardProps;
}

export const Leaderboard = ({ leaderboard, cardProps }: Props) => {
  const router = useRouter();

  const onClick = (id: number) => {
    return (e: MouseEvent<HTMLElement>) => {
      e.preventDefault();
      const href = `/player/${id}`;
      router.push(href);
    };
  };

  return (
    <Card tableGrid {...cardProps}>
      <TitleRow title="Leaderboard" />
      <Table
        dataRows={prepareLeaderboardData(leaderboard)}
        columns={leaderboardColumns}
        columnStartIndices={[1, 4, 10]}
        rowOnClick={onClick}
      />
    </Card>
  );
};
