import { PlayerWithStats } from '../../common/types'
import { NextPage } from 'next'

interface Props {
  player: PlayerWithStats
  color: string
}

const PlayerHeader: NextPage<Props> = ({ player, color }) => {
  const playerEmoji = String.fromCodePoint(player.emoji.slice(2))
  const bgColor = `bg-[${color}]`

  return (
    <header className={`${bgColor} flex items-center justify-between p-12 gap-8`}>
      <div className="flex justify-center items-center gap-20">
        <div className="w-64 h-64 rounded-[50%] text-9xl bg-white flex justify-center items-center shadow-xl">
          {playerEmoji}
        </div>
      </div>
      <div className="flex items-center justify-center gap-8 flex-wrap">
        <div className="text-white text-5xl text-center">
          <strong>
            {player.firstName}
            <i>{player.nickname ? ` "${player.nickname}"` : ''}</i> {player.lastName}
          </strong>{' '}
          #5
        </div>
        <div className="text-white rounded-lg border-white border-[1px] p-10">
          <div>
            <strong>Elo:</strong> {player.elo}
          </div>
          <div>
            <strong>Suurin elo:</strong> {player.maxElo}
          </div>
          <div>
            <strong>Suurin elo:</strong> {player.maxElo}
          </div>
          <div>
            <strong>Voitetut:</strong> {player.wonGames} + <strong>Hävityt:</strong>{' '}
            {player.lostGames} = {player.wonGames + player.lostGames}
          </div>
        </div>
      </div>
    </header>
  )
}

export default PlayerHeader
