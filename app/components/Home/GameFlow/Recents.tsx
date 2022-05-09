
import { GameListItem, PlayerWithoutElo, QueueInfo } from '../../../common/types'
import RecentGame from './RecentGame'


interface Props {
  recents: GameListItem[]
}

const Recents = ({ recents }: Props) => {

  return(
    <div>
      <h2 className='p-8'>Viimeisimmät pelit</h2>
      <div className={`h-[30vh] overflow-y-auto`}> 
        {recents.map(game => <RecentGame game={game} key={game.id}/>)}
      </div>
    </div>
  )
}

export default Recents