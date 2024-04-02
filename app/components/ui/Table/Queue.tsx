import type { Dispatch, MouseEvent } from "react";
import { FiTrash2 } from "react-icons/fi";

import { ButtonIcon } from "@ui/ButtonIcon";

import type { Player, WithId } from "@common/types";
import { formatFullName } from "@common/utils/helperFunctions";
import { type Action, removeFromQueue } from "@state/Queue";
import { createColumnHelper } from "@tanstack/react-table";

export interface QueuePlayer extends WithId {
  position: string;
  fullName: string;
  removeButton: HTMLButtonElement;
}

/**
 *
 * @param data - Current players from the queue
 * @param dispatch - Dispatch function that can be used to update the Queue state
 * @returns Formatted players that can be passed to the Queue table
 */
export const prepareQueueData = (
  data: Player[],
  dispatch: Dispatch<Action>,
): QueuePlayer[] => {
  return data.map((player, index) => ({
    id: player.id,
    position: `${index + 1}.`,
    fullName: formatFullName(player, true, false),
    icon: FiTrash2,
    removeButton: (
      <ButtonIcon
        Icon={FiTrash2}
        intent="destructive"
        onClick={(e: MouseEvent<HTMLElement>) => {
          e.stopPropagation();
          dispatch(removeFromQueue(player.id));
        }}
      />
    ),
  }));
};

const columnHelper = createColumnHelper<QueuePlayer>();

export const queueColumns = [
  columnHelper.accessor("position", {
    header: "Position",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("fullName", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("removeButton", {
    header: "",
    id: "RemoveButton",
    cell: (info) => info.getValue(),
  }),
];
