import {
  type ComponentProps,
  type Dispatch,
  type SetStateAction,
  useState,
} from "react";

import type { Column } from "@tanstack/react-table";

type DivProps = ComponentProps<"div">;

interface Props extends DivProps {
  column: Column<any, any>;
  setDisplayState: Dispatch<SetStateAction<number | string>>;
}

const options = ["All", "💩", "No - 💩"];
type Options = (typeof options)[number];

export const SelectFilter = ({ column, setDisplayState, ...props }: Props) => {
  const [state, setState] = useState<string>("All");
  const [visible, setVisible] = useState<boolean>(false);

  const switchFilter = (value: Options) => {
    if (value === "All") {
      column.setFilterValue(undefined);
    } else if (value === "💩") {
      column.setFilterValue(true);
    } else if (value === "No - 💩") {
      column.setFilterValue(false);
    }
  };

  return (
    <div {...props} className="relative">
      <input
        placeholder={state}
        className="w-full border border-neutral-700 bg-neutral-600 p-3 text-lg font-normal text-neutral-200 outline-none placeholder:text-neutral-800"
        onClick={() => setVisible(true)}
      />
      {visible && (
        <div className="absolute top-16 w-full">
          {options.map((option) => (
            <button
              type="button"
              className="h-14 w-full cursor-pointer list-none border border-neutral-700 bg-primary-400 p-3 text-left text-lg font-normal text-primary-50 transition-all duration-200 placeholder:text-neutral-800 hover:bg-primary-300"
              key={option}
              onClick={() => {
                setState(option);
                switchFilter(option);
                setVisible(false);
                setDisplayState(1);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
