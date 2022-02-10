import React from 'react'

interface Props {
  playerName: string;
  // This type is incorrect
  handleClick: (event: React.MouseEventHandler<HTMLButtonElement>) => void;
}

const CurrentPlayerButton: React.FC<Props> = ({ playerName, handleClick }) => {
  return (
    <button onClick={handleClick} type='button' className="bg-prodekoBlue hover:bg-blue-800 w-48 h-24 rounded-sm hover:rounded-md content-center">
      <h5 className='font-bold'>{playerName}</h5>
    </button>
  )
}

export default CurrentPlayerButton