import { Game } from '@common/types'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import axios from 'axios'
import { NextApiResponse } from 'next'
import styles from './Recents.module.scss'

const TitleRow = () => {
  const handleRemove = async () => {
    window.alert('Remove the latest game?')
    const { data } = await axios.delete(`${NEXT_PUBLIC_API_URL}/game/latest`)

    if (typeof data == 'string') {
      console.error(data)
    } else if (typeof data == 'object') {
      console.log(
        `Removed game id ${data.id} with winner ${data.winnerId} and loser ${data.loserId}`
      )
    }
  }

  return (
    <div className={styles.titleRow}>
      <h2 className={styles.title}>Recents</h2>
      <button className={styles.removeButton} onClick={handleRemove}>
        Remove latest
      </button>
    </div>
  )
}

export default TitleRow
