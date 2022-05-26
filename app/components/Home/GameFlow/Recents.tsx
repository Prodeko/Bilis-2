import { GameListItem, PlayerWithoutElo, QueueInfo } from '../../../common/types'
import RecentGame from './RecentGame'

interface Props {
  recents: GameListItem[]
}

const cols = `[1fr_5rem_1fr]`

const Recents = ({ recents }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="m-2">Viimeisimmät pelit</h2>
      <div className={`grid grid-cols-${cols} justify-center`}>
        <p className="flex justify-center items-center font-bold text-green-700">Voittaja</p>
        <p className="flex justify-center items-center font-bold text-slate-700">Klo</p>
        <p className="flex justify-center items-center font-bold text-red-700">Häviäjä</p>
      </div>
      <div className={`flex flex-col gap-4 overflow-y-auto h-[calc(50vh-19rem)]`}>
        {recents.map(game => (
          <RecentGame game={game} headerCols={cols} key={game.id} />
        ))}
      </div>
    </div>
  )
}

export default Recents
