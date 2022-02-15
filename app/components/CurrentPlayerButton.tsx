import React, { MouseEventHandler } from 'react'

interface Props {
  playerName: string;
  playerId: string,
  handleClick: MouseEventHandler<HTMLButtonElement>;
}

const CurrentPlayerButton = ({ playerName, playerId, handleClick }: Props) => {
  return (
    <button
      onClick={handleClick}
      type='button'
      className="bg-prodekoBlue shadow-xl w-full h-20 mx-8 hover:scale-110 rounded-lg hover:rounded-2xl items-center transition-all">
      <div className="text-gray-100">
        <h3>{playerName}</h3>
        <h3 className="font-normal">#{playerId}</h3>
      </div>
    </button>
  )
}

export default CurrentPlayerButton