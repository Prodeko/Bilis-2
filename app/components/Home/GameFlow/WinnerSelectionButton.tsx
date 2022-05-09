const WinnerSelectionButton = ({ handleClick }: {handleClick: () => Promise<void>}) => {
  return (
    <button className='bg-gray-300 text-white w-full rounded shadow-xl hover:bg-green-600 ' onClick={handleClick}>Voittaja</button>
  )
}

export default WinnerSelectionButton