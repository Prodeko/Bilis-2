import { GameListItem } from '../../../common/types'
import Card from '../../Utility/Card'

interface Props {
  game: GameListItem
}

// FIX: ADD previous elo and new elo
// const cardCols = `[2fr_3fr_2fr]`
const cardCols = `2`
// const cardCols = `[3rem_3rem_3rem_3rem_3rem]`

const RecentGame = ({ game }: Props) => {
  const loserEmoji = String.fromCodePoint(parseInt(game.winner.emoji.slice(2)))
  const winnerEmoji = String.fromCodePoint(parseInt(game.loser.emoji.slice(2)))

  return (
    <div className={`grid grid-cols-headerRow`}>
      <Card cols={cardCols}>
        <div className="flex items-center gap-3">
          <div
            style={{ background: game.winner.favoriteColor }}
            className={`shadow-l w-8 h-8 py-4 rounded-full flex justify-center items-center text-xl`}
          >
            {loserEmoji}
          </div>
          <p className="">{`${game.winner.firstName} ${game.winner.lastName[0]}.`}</p>
        </div>
        <div className="flex justify-between">
          <p>{game.winnerElo.toFixed(0)}</p>
          <p>&rarr;</p>
          <p>699</p>
        </div>
      </Card>
      <div className="flex flex-col items-center justify-center">
        <p>{game.datetime.toString().slice(11, 16)}</p>
      </div>
      <Card cols={cardCols}>
        <div className="flex items-center gap-3">
          <div
            style={{ background: game.loser.favoriteColor }}
            className={`shadow-l w-8 h-8 py-4 rounded-full flex justify-center items-center text-xl`}
          >
            {loserEmoji}
          </div>
          <p className="">{`${game.loser.firstName} ${game.loser.lastName[0]}.`}</p>
        </div>
        <div className="flex justify-between">
          <p>{game.loserElo.toFixed(0)}</p>
          <p>&rarr;</p>
          <p>699</p>
        </div>
      </Card>
    </div>
  )
}

export default RecentGame
