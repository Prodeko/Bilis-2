const WinnerSelectionButton = ({ handleClick }: { handleClick: () => Promise<void> }) => {
  return (
    <button className="bg-green-600 hover:bg-green-500 btn" onClick={handleClick}>
      Voittaja
    </button>
  )
}

export default WinnerSelectionButton
