const WinnerSelectionButton = ({ handleClick }: { handleClick: () => Promise<void> }) => {
  return (
    <button
      className="bg-green-600 text-white w-full rounded shadow-xl hover:bg-green-700 transition-all"
      onClick={handleClick}
    >
      Voittaja
    </button>
  )
}

export default WinnerSelectionButton
