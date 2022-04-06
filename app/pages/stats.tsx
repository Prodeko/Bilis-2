import type { NextPage } from "next"
import React, { useState } from "react"
import TimeSeriesChart from '../components/Graphs/TimeSeriesChart'
import PieChart from '../components/Graphs/PieChart'

const dummyEloData = [
  400, 410, 420.5, 410, 415, 399, 380, 370, 365, 355,
  365, 370, 364, 358, 370, 381, 391, 398, 405, 410, 402,
  413, 425, 433, 440, 437, 444, 431, 425, 437, 425, 421
]

const playerColor = 'hsl(210.4,100%,25%)'

const dummyPlayer1 = {
  name: "Aleks",
  mutualGamesWon: 14,
  favoriteColor: "#F7F"
}

const dummyPlayer2 = { 
  name: "Sakari",
  mutualGamesWon: 10,
  favoriteColor: "#AF4"
}

const Stats: NextPage = () => {
  return (
    <div className='ml-8 py-4 flex flex-col h-screen content-center h-screen'>
      <h1 className="text-8xl font-bold m-8 h-40">Statistiikka</h1>
      <div className='grid gap-y-40 grid-cols-2'>
        <TimeSeriesChart eloData={dummyEloData} chartName={"All Time Stats"} dataName={"All Time"} color={playerColor} />
        <TimeSeriesChart eloData={dummyEloData} chartName={"All Time Stats"} dataName={"All Time"} color={playerColor} />
        <PieChart player1={dummyPlayer1} player2={dummyPlayer2} />
        <PieChart player1={dummyPlayer1} player2={dummyPlayer2} />
      </div>
    </div>
  )
}

export default Stats;
