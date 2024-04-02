import { cva } from "class-variance-authority";

import type { Player } from "@common/types";
import { formatFullName } from "@common/utils/helperFunctions";
import { createSmoothScrollFn } from "@common/utils/helperFunctions";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export interface DropdownProps extends ListItemProps {
  arr: Player[];
  emptyArrayText: string;
  showDropdown: boolean;
  selectedIdx: number;
  smoothScrollId: string;
  rowOnClick: (player: Player) => void;
}

const listStyles = cva(
  "absolute right-0 top-14 flex w-full list-none flex-col overflow-x-hidden overflow-y-scroll rounded-lg bg-white text-neutral-800 transition-all duration-500",
  {
    variants: {
      visible: {
        true: "max-h-[400%]",
        false: "max-h-0",
      },
    },
  },
);

const listItemStyles = cva(
  "flex w-full cursor-pointer p-2 text-base font-normal",
  {
    variants: {
      selected: {
        true: "bg-neutral-300",
      },
    },
  },
);

/**
 * Returns a dropdown component that displays rows of player values
 *
 * @remarks Can also use any of the "li" html element props
 *
 * @param arr - Array of players
 * @param emptyArrayText - Displayed text when array is empty
 * @param showDropdown - Boolean value that defines if dropdown is open or closed
 * @param selectedIdx - Selected list element index
 * @param smoothScrollId - Id of the target element for smooth scroll -  TODO!
 * @param rowOnClick - onClick eventhandler for PlayerListItem
 * @returns Dropdown component
 */
export const Dropdown = ({
  arr,
  emptyArrayText,
  showDropdown,
  selectedIdx,
  smoothScrollId,
  rowOnClick,
  ...props
}: DropdownProps) => {
  const [parent, _enableAnimations] = useAutoAnimate<HTMLUListElement>({
    duration: 250,
  });
  const selected = (i: number) => selectedIdx === i;
  const smoothScroll = createSmoothScrollFn(smoothScrollId);

  return (
    <ul ref={parent} className={listStyles({ visible: showDropdown })}>
      {arr.length > 0 ? (
        arr.map((player, i) => (
          <li
            {...props}
            className={listItemStyles({ selected: selected(i) })}
            key={player.id}
            id={selected(i) && smoothScrollId}
            onClick={() => rowOnClick(player)}
            onKeyPress={() => smoothScroll(smoothScrollId)}
          >
            <span className="h-fit w-full truncate">
              {formatFullName(player, true, player.nickname)}
            </span>
          </li>
        ))
      ) : (
        <li className="flex h-64 items-center justify-center text-center text-3xl">
          {emptyArrayText}
        </li>
      )}
    </ul>
  );
};
