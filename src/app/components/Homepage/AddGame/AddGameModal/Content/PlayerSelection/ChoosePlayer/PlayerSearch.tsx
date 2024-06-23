import { type KeyboardEventHandler, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";

import { player } from "@common/types";
import useDebounce from "@hooks/useDebounce";
import {
  type Side,
  resetPlayers,
  setFocus,
  setPlayers,
  setSelectedIdx,
  useModalState,
} from "@state/Modal";

interface Props {
  side: Side;
  handleKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

export const PlayerSearch = ({ side, handleKeyDown }: Props) => {
  // Note about displaying logic: First the recent players get displayed. When the player starts typing in the input bar, the recency doesn't matter anymore, Instead, players matching the filter will be returned in alphabetical order.

  const [query, setQuery] = useDebounce<string>("", 400);
  const [{ refs, focus }, dispatch] = useModalState();

  useEffect(() => {
    const search = async (q: string) => {
      const searchParams = new URLSearchParams({
        query: q,
      });
      const res = await fetch(`/api/player?${searchParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      const players = player.array().parse(data);
      dispatch(setPlayers(side, players));
    };
    const isEmpty = query.length === 0;
    if (!isEmpty) {
      search(query);
    } else {
      dispatch(resetPlayers(side));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, side, dispatch]);

  return (
    <div className="flex w-full items-center gap-2 rounded-t-lg bg-primary-800 px-4 py-4">
      <label
        htmlFor="search"
        className="flex h-5 w-5 items-center justify-center text-primary-300"
      >
        <HiOutlineSearch size={20} alt="Search Icon" />
      </label>
      <input
        className="h-full w-full border-none bg-inherit text-base font-normal text-neutral-200 outline-none placeholder:text-neutral-400"
        id="search"
        onChange={({ target }) => setQuery(target.value)}
        placeholder="Search for player..."
        autoComplete="off"
        onKeyDown={handleKeyDown}
        onClick={() => {
          if (focus === side) return;
          dispatch(setSelectedIdx(0));
          dispatch(setFocus(side));
        }}
        ref={refs?.[side]}
      />
    </div>
  );
};
