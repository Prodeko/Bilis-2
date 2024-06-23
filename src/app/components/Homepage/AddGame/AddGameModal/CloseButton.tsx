import { HiX } from "react-icons/hi";

interface Props {
  onClose: () => void;
}

export const CloseButton = ({ onClose }: Props) => {
  return (
    <button
      className="absolute -left-8 -top-8 flex h-16 w-16 cursor-pointer items-center justify-center rounded-[50%] border-none bg-primary-700 transition-all duration-300 hover:scale-105 hover:bg-primary-800 hover:shadow-md active:scale-100 active:bg-primary-900 active:shadow-none"
      type="button"
      onClick={() => {
        onClose();
      }}
    >
      <HiX size={32} className="text-primary-200" />
    </button>
  );
};
