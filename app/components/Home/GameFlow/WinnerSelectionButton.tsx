const WinnerSelectionButton = ({ handleClick }: { handleClick: () => Promise<void> }) => {
  return (
    <button
      className="bg-green-600 hover:bg-green-500 hover:-translate-y-1 py-1 px-2 text-white w-full rounded-full shadow-xl transition-all"
      onClick={handleClick}
    >
      Voittaja
    </button>
  )
}

export default WinnerSelectionButton
