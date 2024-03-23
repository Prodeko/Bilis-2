"use client";

import { useEffect, useState } from "react";

import MottoCard from "@ui/MottoCard";

import { type Player, player } from "@common/types";

interface Props {
  randomPlayer: Player;
}

const RandomPlayer = ({ randomPlayer }: Props) => {
  const [currentPlayer, setCurrentPlayer] = useState<Player>(randomPlayer);
  const [upcomingPlayer, setUpcomingPlayer] = useState<Player | undefined>(
    undefined,
  );
  const [switching, setSwitching] = useState<boolean>(false);

  const setRandomPlayer = async () => {
    const res = await fetch("api/player/random", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    const randomPlayer = player.parse(json);
    setUpcomingPlayer(randomPlayer);
  };

  // Fetch a new random player on set interval, default every 60 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setRandomPlayer();
    }, 60 * 1000);
    return () => clearInterval(timer);
  }, [setRandomPlayer]);

  // Switch the motto while pushing the motto card into the side of the page
  useEffect(() => {
    const switchMotto = () => {
      setTimeout(() => setSwitching(false), 2000);
      setSwitching(true);
      if (upcomingPlayer)
        setTimeout(() => setCurrentPlayer(upcomingPlayer), 1000);
    };

    if (upcomingPlayer) switchMotto(); // Run after hydration (first render)
  }, [upcomingPlayer]);

  const author = `${currentPlayer?.firstName} "${currentPlayer?.nickname}" ${currentPlayer?.lastName}`;

  return (
    <MottoCard
      style={{ gridColumn: "2 / -1" }}
      text={currentPlayer?.motto}
      author={author}
      switching={switching}
    />
  );
};

export default RandomPlayer;
