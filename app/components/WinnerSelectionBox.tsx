import CurrentPlayerButton from "./CurrentPlayerButton";

const WinnerSelectionBox = () => {
  return (
    <div className="flex flex-row flex-nowrap w-full mx-2 justify-evenly items-center">
      <CurrentPlayerButton handleClick={() => {}} playerName='Teemu Teekkari' playerId="123" />
      <p>vs</p>
      <CurrentPlayerButton handleClick={() => {}} playerName='Tiina Teekkari' playerId="456" />
    </div>
  )
}

export default WinnerSelectionBox