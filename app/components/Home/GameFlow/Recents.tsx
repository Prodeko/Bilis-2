import { GameListItem, PlayerWithoutElo, QueueInfo } from '../../../common/types'
import RecentGame from './RecentGame'

interface Props {
  recents: GameListItem[]
}

const Recents = ({ recents }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="m-2">Viimeisimmät pelit</h2>
      <div className={`flex flex-col gap-4 overflow-y-auto h-[calc(100vh-880px)]`}>
        {recents.map(game => (
          <RecentGame game={game} key={game.id} />
        ))}
      </div>
    </div>
  )
}

export default Recents
