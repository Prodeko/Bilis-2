import { GameListItem } from '../../../common/types'
import Card from './Card'

const RecentGame = ({ game }: { game: GameListItem }) => {
  const loserEmoji = String.fromCodePoint(parseInt(game.winner.emoji.slice(2)))
  const winnerEmoji = String.fromCodePoint(parseInt(game.loser.emoji.slice(2)))
  return (
    <Card>
      <div>{game.datetime.toString().slice(11, 16)}</div>
      <div
        style={{ background: game.winner.favoriteColor }}
        className="shadow-l w-8 h-8 py-4 rounded-full flex justify-center items-center text-xl"
      >
        {loserEmoji}
      </div>
      <div>{`${game.winner.firstName} ${game.winner.lastName}`}</div>
      <div>{game.winnerElo.toFixed(0)}</div>
      <div>VS{game.underTable ? String.fromCodePoint(128169) : ' '}</div>
      <div
        style={{ background: game.loser.favoriteColor }}
        className="shadow-l w-8 h-8 py-4 rounded-full flex justify-center items-center text-xl"
      >
        {winnerEmoji}
      </div>
      <div>{`${game.loser.firstName} ${game.loser.lastName}`}</div>
      <div>{game.loserElo.toFixed(0)}</div>
    </Card>
  )
}

export default RecentGame
