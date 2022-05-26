import type { NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import TimeSeriesChart from '../components/Graphs/TimeSeriesChart'
import PieChart from '../components/Graphs/PieChart'

const dummyEloData = [
  400, 410, 420.5, 410, 415, 399, 380, 370, 365, 355, 365, 370, 364, 358, 370, 381, 391, 398, 405,
  410, 402, 413, 425, 433, 440, 437, 444, 431, 425, 437, 425, 421,
]

const playerColor = 'hsl(210.4,100%,25%)'

const dummyPlayer1 = {
  name: 'Aleks',
  mutualGamesWon: 14,
  favoriteColor: '#F7F',
}

const dummyPlayer2 = {
  name: 'Sakari',
  mutualGamesWon: 10,
  favoriteColor: '#AF4',
}

const Stats: NextPage = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLHeadingElement | null>(null)
  const [chartHeight, setChartHeight] = useState(0)

  useEffect(() => {
    // Set chartHeight to be half of the available screen height
    if (wrapperRef.current && headerRef.current) {
      const headerRect = headerRef.current.getBoundingClientRect()
      const wrapperHeight = wrapperRef.current.clientHeight - headerRect.y
      const yPadding = 20
      setChartHeight((wrapperHeight - yPadding) / 2)
    }
  }, [wrapperRef, headerRef])

  return (
    <div className="ml-8 py-4 flex flex-col h-screen content-center">
      <h1 ref={headerRef} className="text-8xl font-bold h-1/6 m-8">
        Statistiikka
      </h1>
      <div ref={wrapperRef} className="grid grid-cols-2 h-5/6">
        <TimeSeriesChart
          eloData={dummyEloData}
          chartName={'All Time Stats'}
          dataName={'All Time'}
          color={playerColor}
          height={chartHeight}
        />
        <TimeSeriesChart
          eloData={dummyEloData}
          chartName={'All Time Stats'}
          dataName={'All Time'}
          color={playerColor}
          height={chartHeight}
        />
        <PieChart player1={dummyPlayer1} player2={dummyPlayer2} height={chartHeight} />
        <PieChart player1={dummyPlayer1} player2={dummyPlayer2} height={chartHeight} />
      </div>
    </div>
  )
}

export default Stats
