import { ModalBlur } from "@ui/ModalBlur";

import type { RecentGame } from "@common/types";

interface Props {
  games: RecentGame[];
  setGames: (x: RecentGame[]) => void;
  closeModal: () => void;
}

export const GameDeletionModal = ({ games, setGames, closeModal }: Props) => {
  const handleRemove = async () => {
    const res = await fetch("/api/game", {
      method: "DELETE",
    });
    const data = await res.json();

    if (typeof data === "string") return console.error(data);

    setGames(games.slice(1));
    closeModal();
  };

  return (
    <ModalBlur>
      <div className="relative m-32 grid h-fit max-w-4xl grid-rows-[auto_minmax(0,_1fr)] overflow-hidden rounded-2xl bg-neutral-800 text-neutral-300">
        <header className="bg-primary-800 p-16 text-center text-5xl font-bold">
          Do you want to delete the last game?
        </header>
        <div className="grid grid-cols-2 justify-center gap-x-16 p-16">
          <button
            className="h-fit cursor-pointer rounded-lg border-none bg-danger-600 p-4 text-xl font-semibold text-white transition-all duration-300 hover:bg-danger-500 focus:bg-danger-500 focus:outline-none focus:ring-2 focus:ring-danger-500 focus:ring-opacity-50 active:bg-danger-400"
            type="button"
            autoFocus
            onClick={handleRemove}
          >
            Delete Game
          </button>
          <button
            className="h-fit cursor-pointer rounded-lg border-none bg-primary-600 p-4 text-xl font-semibold text-white transition-all duration-300 hover:bg-primary-500 focus:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 active:bg-primary-400"
            type="button"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalBlur>
  );
};
