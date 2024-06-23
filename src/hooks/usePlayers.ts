import { useEffect, useState } from "react";

import { type Player, player } from "@common/types";
import useDebounce from "@hooks/useDebounce";

const usePlayers = (delayMs: number) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [query, setQuery] = useDebounce<string>("", delayMs);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchParams = new URLSearchParams({ query });
        const res = await fetch(`/api/player?${searchParams}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        const players = player.array().parse(data);
        setPlayers(players);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    fetchData();
  }, [query]);

  return { players, query, setQuery };
};

export default usePlayers;
