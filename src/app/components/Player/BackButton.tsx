import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

export const BackButton = ({ route }: { route: string }) => {
  return (
    <Link
      className="background-none absolute left-8 top-8 cursor-pointer border-none "
      href={route}
    >
      <BsArrowLeft className="h-8 w-8 text-white" />
    </Link>
  );
};
