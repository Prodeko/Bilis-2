import { NextPage } from 'next'
import PlayerInfo from '../../components/PlayerScreen/PlayerInfo'
import PlayerStats from '../../components/PlayerScreen/PlayerStats'

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

const PlayerScreen: NextPage = () => {
  return (
    <div className='ml-8 py-4 flex flex-col h-screen content-center'>
      <h1 className="text-8xl font-bold m-8">Pelaaja</h1>
      <div className='p-6'>
        <PlayerInfo {...infoProps} />
        <PlayerStats {...statsProps} />
      </div>
    </div>
  )
}

export default PlayerScreen