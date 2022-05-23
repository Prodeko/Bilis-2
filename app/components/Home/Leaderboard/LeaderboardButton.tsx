import type { NextPage } from 'next'
import { useState } from 'react'

interface Props {
  setAllTimeSelected: (arg: boolean) => void
  allTimeSelected: boolean
  allTimeText: string
  seasonalText: string
}

const LeaderboardButton: NextPage<Props> = ({
  setAllTimeSelected,
  allTimeSelected,
  allTimeText,
  seasonalText,
}) => {
  const active = 'bg-gray-100 font-bold text-xl border-2 border-prodekoBlue'
  const disabled = 'bg-gray-300 hover:bg-gray-200 hover:-translate-y-1'
  const buttonProperties = 'w-[10rem] rounded-t transition-all py-1'

  return (
    <div className="relative">
      <div className="flex absolute -translate-y-9 gap-1 text-lg pl-[0.5rem]">
        <button
          className={`${buttonProperties} ${allTimeSelected ? active : disabled}`}
          onClick={() => setAllTimeSelected(true)}
        >
          {allTimeText}
        </button>
        <button
          className={`${buttonProperties} ${!allTimeSelected ? active : disabled}`}
          onClick={() => setAllTimeSelected(false)}
        >
          {seasonalText}
        </button>
      </div>
    </div>
  )
}

export default LeaderboardButton
