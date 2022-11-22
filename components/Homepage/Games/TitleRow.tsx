import { RecentGame } from '@common/types'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import axios from 'axios'
import styles from './Games.module.scss'

interface Props {
  games: RecentGame[]
  setGames: (x: RecentGame[]) => void
}

const TitleRow = ({ games, setGames }: Props) => {
  const handleRemove = async () => {
    if (window.confirm('Remove the latest game?')) {
      const { data } = await axios.delete(`${NEXT_PUBLIC_API_URL}/game/latest`)

      if (typeof data == 'string') return console.error(data)

      setGames(games.slice(1))
    }
  }

  return (
    <div className={styles.titleRow}>
      <h2 className={styles.title}>Games</h2>
      <button className={styles.removeButton} onClick={handleRemove}>
        Remove latest
      </button>
    </div>
  )
}

export default TitleRow
