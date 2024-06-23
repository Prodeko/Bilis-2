"use client";

import { TableWithPagination } from "@ui/MultifunctionTable";
import {
  type GameTableSchema,
  getGameColumnSchema,
} from "@ui/MultifunctionTable/schemas";

interface Props {
  data: GameTableSchema[];
}

export const TableProvider = ({ data }: Props) => {
  const columns = getGameColumnSchema();
  return (
    <TableWithPagination
      {...{
        data,
        columns,
      }}
    />
  );
};
