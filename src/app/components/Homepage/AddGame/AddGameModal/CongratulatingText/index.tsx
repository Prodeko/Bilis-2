// import { GameCreation } from "@components/Homepage/AddGame/AddGameModal/Content/GameCreation";
// import { useModalState } from "@state/Modal";

type Props = {
  onClose: () => void;
  content: string;
};

export const CongratulatingTextContent = ({ onClose, content }: Props) => {
  return (
    <div className="grid h-full min-h-0 grid-rows-[auto_minmax(0_,1fr)]">
      <h2 className="bg-primary-800 p-16 text-center text-5xl font-bold capitalize text-neutral-200">
        testing
        {content}
      </h2>
      {/* <div className="grid h-full min-h-0 grid-cols-3 gap-x-8 p-8">
        <GameCreation onClose={onClose} />
      </div> */}
    </div>
  );
};
