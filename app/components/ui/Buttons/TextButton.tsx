"use client";

import { type VariantProps, cva } from "class-variance-authority";
import Link from "next/link";
import {
  type ComponentPropsWithRef,
  type ForwardedRef,
  forwardRef,
} from "react";
import type { IconType } from "react-icons";

const styles = cva(
  "flex items-center justify-center gap-2 rounded-md border-none px-5 py-3 text-base font-semibold text-white transition-all hover:cursor-pointer disabled:cursor-not-allowed",
  {
    variants: {
      intent: {
        primary:
          "bg-primary-700 hover:bg-primary-800 active:bg-primary-900 disabled:bg-primary-300 disabled:text-primary-100 disabled:hover:bg-primary-300 disabled:active:bg-primary-300",
        destructive:
          "bg-danger-700 hover:bg-danger-600 active:bg-danger-500 disabled:bg-danger-400",
      },
      fullWidth: {
        true: "w-full",
      },
    },
  },
);

interface BaseProps {
  LeftIcon?: IconType;
  text: string;
  RightIcon?: IconType;
}

type ButtonVariantProps = VariantProps<typeof styles>;

interface ButtonProps
  extends BaseProps,
    ComponentPropsWithRef<"button">,
    Omit<ButtonVariantProps, "intent">,
    Required<Pick<ButtonVariantProps, "intent">> {
  buttonType: "button";
}

interface LinkProps
  extends BaseProps,
    ComponentPropsWithRef<"a">,
    Omit<ButtonVariantProps, "intent">,
    Required<Pick<ButtonVariantProps, "intent">> {
  buttonType: "a";
  href: string;
}

type Props = ButtonProps | LinkProps;
type RefProps<T extends Props> = T extends LinkProps
  ? ForwardedRef<HTMLAnchorElement>
  : ForwardedRef<HTMLButtonElement>;

export const TextButton = forwardRef((props: Props, ref: RefProps<Props>) => {
  if (props.buttonType === "a") {
    const {
      text,
      intent,
      fullWidth,
      href,
      LeftIcon,
      RightIcon,
      buttonType,
      ...restProps
    } = props;
    return (
      <Link
        {...restProps}
        href={href}
        ref={ref as RefProps<LinkProps>}
        className={styles({ intent, fullWidth })}
      >
        {LeftIcon && (
          <span>
            <LeftIcon />
          </span>
        )}
        <span>{text}</span>
        {RightIcon && (
          <span>
            <RightIcon />
          </span>
        )}
      </Link>
    );
  }

  const {
    text,
    intent,
    fullWidth,
    LeftIcon,
    RightIcon,
    buttonType,
    ...restProps
  } = props;
  return (
    <button
      {...restProps}
      type={props.type}
      ref={ref as RefProps<ButtonProps>}
      className={styles({ intent, fullWidth })}
    >
      {LeftIcon && (
        <span>
          <LeftIcon />
        </span>
      )}
      <span>{text}</span>
      {RightIcon && (
        <span>
          <RightIcon />
        </span>
      )}
    </button>
  );
});
