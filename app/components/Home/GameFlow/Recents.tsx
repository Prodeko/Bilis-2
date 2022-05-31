import { GameListItem, PlayerWithoutElo, QueueInfo } from '../../../common/types'
import RecentGame from './RecentGame'
import HeaderRow from '../../Utility/HeaderRow'

interface Props {
  recents: GameListItem[]
}

const Recents = ({ recents }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="m-2">Viimeisimmät pelit</h2>
      <HeaderRow middleColumn="Klo" />
      <div className={`flex flex-col gap-4 overflow-y-auto max-h-[calc(50vh-19rem)]`}>
        {recents.map(game => (
          <RecentGame game={game} key={game.id} />
        ))}
      </div>
    </div>
  )
}

export default Recents
