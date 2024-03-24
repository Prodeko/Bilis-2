"use client";

import { cva } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type NavProps = ComponentProps<"nav">;

interface LinkType {
  href: string;
  linkName: string;
}

interface Props extends NavProps {
  links: LinkType[];
}

const styles = cva(
  "cursor-pointer p-2 capitalize text-primary-100 transition-colors duration-200",
  {
    variants: {
      active: {
        true: "border-b-2 border-primary-25 font-semibold text-primary-25",
        false: "hover:text-primary-50",
      },
    },
  },
);

export const Navigation = ({ links, ...props }: Props) => {
  const pathName = usePathname();
  return (
    <nav {...props} className="flex gap-6 text-4xl">
      {links.map((link) => (
        <Link
          className={styles({ active: pathName === link.href })}
          key={link.href}
          href={link.href}
        >
          {link.linkName}
        </Link>
      ))}
    </nav>
  );
};
