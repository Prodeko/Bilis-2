import { ComingSoon } from "@ui/ComingSoon";

import { Card } from "@components/ui/Card";

import { GameCountTracker } from "./localComponents/GameCountTracker/GameCountTracker";
import { HallOfFame } from "./localComponents/HallOfFame/HallOfFame";

const StatsPage = async () => {
  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-8 p-12">
      <Card
        style={{
          gridRow: "1 / -1",
        }}
      >
        <HallOfFame />
      </Card>
      <Card
        style={{
          gridRow: "1 / 3",
          gridColumn: "2 / -1",
        }}
      >
        <ComingSoon />
      </Card>
      <Card
        style={{
          gridRow: "3 / -1",
          gridColumn: "2 / -1",
        }}
      >
        <GameCountTracker />
      </Card>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default StatsPage;
