import { NextPage } from 'next'
import PlayerInfo from '../../components/PlayerScreen/PlayerInfo'
import PlayerStats from '../../components/PlayerScreen/PlayerStats'
import PieChart from '../../components/Graphs/PieChart'
import TimeSeriesChart from '../../components/Graphs/TimeSeriesChart'
import PlayerList from '../../components/PlayerScreen/PlayerList'

const infoProps = {
  playerName: "Webbi Tiimiläinen",
  favColor: '#d19999',
  nickName: "Balsamiq",
  favBall: "Kasi"
}

const statsProps = {
  playedGames: 100,
  wonGames: 69,
  seasonalRanking: 23,
  seasonalElo: 666,
  overallRanking: 34,
  overallElo: 456
}

const dummyEloData = [
  400, 410, 420.5, 410, 415, 399, 380, 370, 365, 355,
  365, 370, 364, 358, 370, 381, 391, 398, 405, 410, 402,
  413, 425, 433, 440, 437, 444, 431, 425, 437, 425, 421
]

const playerColor = 'hsl(210.4,100%,25%)'

const tsProps = {
  eloData: dummyEloData,
  dataName: "All Time",
  chartName: "All Time Stats",
  color: playerColor
}

const player1 = {
  name: "Aleks",
  mutualGamesWon: 14
}

const player2 = { 
  name: "Sakari",
  mutualGamesWon: 10
}

const pieProps = { player1, player2 }

const PlayerScreen: NextPage = () => {
  return (
    <div className='mx-8 py-4 flex flex-col h-screen content-center'>
      <h1 className="text-8xl font-bold m-8">Pelaaja</h1>
      <div className='flex flex-wrap gap-4'>
        <PlayerList>
          <PlayerInfo {...infoProps} />
        </PlayerList>
        <PlayerList>
          <TimeSeriesChart {...tsProps} />
        </PlayerList>
        <PlayerList>
          <PlayerStats {...statsProps} />
        </PlayerList>
        <PlayerList>
          <PieChart {...pieProps} />
        </PlayerList>
      </div>
    </div>
  )
}

export default PlayerScreen