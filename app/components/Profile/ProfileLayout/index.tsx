import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ProfileLayout = ({ children }: Props) => {
  return (
    <div className="grid h-full grid-rows-[auto_auto_minmax(0,_1fr)]">
      {children}
    </div>
  );
};

export default ProfileLayout;
