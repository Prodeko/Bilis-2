import CurrentPlayerButton from "./CurrentPlayerButton";

const WinnerSelectionBox = () => {
  return (
    <div className="flex flex-row flex-nowrap w-full px-2 justify-evenly items-center">
      <CurrentPlayerButton />
      <p className="mx-6">vs</p>
      <CurrentPlayerButton />
    </div>
  )
}

export default WinnerSelectionBox