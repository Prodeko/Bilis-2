"use client";

import { cva } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";

const styles = cva(
  "flex h-20 w-20 cursor-pointer items-center justify-center rounded-[50%] text-neutral-300 transition-all duration-200",
  {
    variants: {
      active: {
        true: "bg-neutral-50 text-primary-800",
        false: "hover:bg-neutral-400 hover:text-primary-800",
      },
    },
  },
);

interface Props {
  path: string;
  Icon: IconType;
}

const SidebarLink = ({ path, Icon }: Props) => {
  const pathName = usePathname();
  const isActive = pathName?.split("/")[1] === path.slice(1);
  return (
    <Link className={styles({ active: isActive })} href={path}>
      <Icon className="h-10 w-10" />
    </Link>
  );
};

export default SidebarLink;
