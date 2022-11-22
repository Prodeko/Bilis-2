import styles from './Table.module.scss'
import GamesRow from './GamesRow'
import { RecentGame } from '@common/types'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  games: RecentGame[]
  setGames: Dispatch<SetStateAction<RecentGame[]>>
}

const TableBody = ({ games, setGames }: Props) => {
  const [parent, _enableAnimations] = useAutoAnimate<HTMLTableSectionElement>()
  return (
    <tbody ref={parent} className={styles.tablebody}>
      {games.map(game => {
        return <GamesRow key={game.id} game={game} />
      })}
    </tbody>
  )
}

export default TableBody
