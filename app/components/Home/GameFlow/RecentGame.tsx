import { GameListItem } from '../../../common/types'
import Card from '../../Utility/Card'

interface Props {
  game: GameListItem
  headerCols: string
}

const cardCols = `[1fr_2fr_1fr]`

const RecentGame = ({ game, headerCols }: Props) => {
  const loserEmoji = String.fromCodePoint(parseInt(game.winner.emoji.slice(2)))
  const winnerEmoji = String.fromCodePoint(parseInt(game.loser.emoji.slice(2)))

  return (
    <div className={`grid grid-cols-${headerCols}`}>
      <Card cols={cardCols}>
        <div
          style={{ background: game.winner.favoriteColor }}
          className={`shadow-l w-8 h-8 py-4 rounded-full flex justify-center items-center text-xl`}
        >
          {loserEmoji}
        </div>
        <div>{`${game.winner.firstName} ${game.winner.lastName}`}</div>
        <div>{game.winnerElo.toFixed(0)}</div>
      </Card>
      <div className="flex flex-col items-center justify-center">
        <p>{game.datetime.toString().slice(11, 16)}</p>
      </div>
      <Card cols={cardCols}>
        <div
          style={{ background: game.loser.favoriteColor }}
          className={`shadow-l w-8 h-8 py-4 rounded-full flex justify-center items-center text-xl`}
        >
          {winnerEmoji}
        </div>
        <div>{`${game.loser.firstName} ${game.loser.lastName}`}</div>
        <div>{game.loserElo.toFixed(0)}</div>
      </Card>
    </div>
  )
}

export default RecentGame
