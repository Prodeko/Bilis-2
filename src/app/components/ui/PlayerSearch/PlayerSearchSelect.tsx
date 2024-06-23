import { cva } from "class-variance-authority";
import {
  type ChangeEventHandler,
  type Dispatch,
  type SetStateAction,
  useState,
} from "react";
import { FiX } from "react-icons/fi";

import { type PieChartProps, type Player, pieChartProps } from "@common/types";
import { formatFullName } from "@common/utils/helperFunctions";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useKeyPress from "@hooks/useKeyPress";
import usePlayers from "@hooks/usePlayers";

const labelStyles = cva(
  "flex w-full justify-between gap-4 rounded-lg bg-white p-3 text-neutral-800",
  {
    variants: {
      visible: {
        true: "cursor-auto",
        false: "cursor-pointer",
      },
    },
  },
);

const buttonStyles = cva(
  "flex h-full w-6 cursor-pointer items-center justify-center border-none bg-transparent transition-all duration-300",
  {
    variants: {
      visible: {
        true: "scale-100 hover:scale-125",
        false: "scale-0",
      },
    },
  },
);

const resultsStyles = cva(
  "absolute top-14 z-10 flex w-full flex-col overflow-y-scroll rounded-lg bg-white text-neutral-800 transition-all duration-500",
  {
    variants: {
      visible: {
        true: "max-h-64",
        false: "max-h-0",
      },
    },
  },
);

const playerButtonStyles = cva(
  "w-full cursor-pointer p-2 text-left text-base font-normal",
  {
    variants: {
      selected: {
        true: "hover:text-neutral-300",
      },
    },
  },
);

interface Props {
  currentPlayerId: number;
  setPieChartProps: Dispatch<SetStateAction<PieChartProps | undefined>>;
}

export const PlayerSearchSelect = ({
  currentPlayerId,
  setPieChartProps,
}: Props) => {
  const [placeholder, setPlaceholder] = useState<string>("Search for a player");
  const [visible, setVisible] = useState<boolean>(false);
  const { players, setQuery } = usePlayers(400);
  const [parent, _enableAnimations] = useAutoAnimate<HTMLDivElement>({
    duration: 200,
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.target.value);
    setVisible(true);
    setSelectedIdx(0);
  };

  const handleSelect = async (opposingPlayer: Player) => {
    if (opposingPlayer.id) {
      try {
        const searchParams = new URLSearchParams({
          currentPlayerId: currentPlayerId.toString(),
          opposingPlayerId: opposingPlayer.id.toString(),
        });
        const res = await fetch(`/api/player/mutual-stats?${searchParams}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = (await res.json()) as PieChartProps;
        const pieProps = pieChartProps.parse(data);
        setPlaceholder(
          `${opposingPlayer.firstName} ${opposingPlayer.lastName}`,
        );
        setPieChartProps(pieProps);
      } catch (e) {
        console.error(e);
      }
    } else {
      console.warn("Trying to select player for player comparison but failed");
    }
  };
  const { handleKeyPress, selectedIdx, setSelectedIdx } = useKeyPress(
    players,
    handleSelect,
  );

  return (
    <div className="relative flex w-full flex-col gap-2">
      <label htmlFor="queue" className={labelStyles({ visible })}>
        <input
          className="w-full cursor-pointer border-none focus:cursor-auto focus:outline-none"
          id="queue"
          placeholder={placeholder}
          onBlur={() => setVisible(false)}
          onClick={() => setVisible(true)}
          onKeyDown={handleKeyPress}
          onChange={handleChange}
        />
        <button
          type="button"
          className={buttonStyles({ visible })}
          onClick={() => setVisible(false)}
        >
          <FiX />
        </button>
      </label>
      <div ref={parent} className={resultsStyles({ visible })}>
        {players.map((player, i) => (
          <button
            type="button"
            key={player.id}
            className={playerButtonStyles({ selected: i === selectedIdx })}
            onClick={() => handleSelect(player)}
          >
            {formatFullName(player, true, true)}
          </button>
        ))}
      </div>
    </div>
  );
};
