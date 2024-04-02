import type { ComponentProps, MouseEvent } from "react";
import type { IconType } from "react-icons";

import { IconButton } from "@ui/Buttons/IconButton";

type BaseInputProps = ComponentProps<"input">;

export interface InputProps extends BaseInputProps {
  IconLeadingProps: {
    Icon: IconType;
  };
  IconTrailingProps?: {
    Icon: IconType;
    onClick: () => void;
    onMouseDown: (e: MouseEvent<HTMLButtonElement>) => void;
  };
  inputId: string;
}

/**
 * Returns an input component
 *
 * @param IconLeadingProps - Props for an icon positioned before the input field
 * @param IconTrailingProps - Props for an icon positioned after the input field
 * @param inputId - Id for the input field, connects label and input field together
 * @returns Input component
 */
export const Input = ({
  IconLeadingProps,
  IconTrailingProps,
  inputId,
  ...props
}: InputProps) => {
  return (
    <div
      className="flex w-full items-center justify-between gap-3 rounded-lg bg-white px-4 py-2 text-neutral-800"
      style={props.style}
    >
      {IconLeadingProps && (
        <label
          className="flex cursor-pointer items-center justify-center text-primary-400"
          htmlFor={inputId}
        >
          <IconLeadingProps.Icon size={20} />
        </label>
      )}
      <input
        id={inputId}
        className="w-full cursor-pointer border-none text-base font-normal focus:cursor-auto focus:outline-none"
        {...props}
      />
      {IconTrailingProps && (
        <IconButton
          onClick={IconTrailingProps.onClick}
          onMouseDown={IconTrailingProps.onMouseDown}
          Icon={IconTrailingProps.Icon}
          intent="primary"
          sizing="lg"
        />
      )}
    </div>
  );
};
