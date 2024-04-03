import type { ReactNode } from "react";

export const ModalBlur = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur">
      {children}
    </div>
  );
};
