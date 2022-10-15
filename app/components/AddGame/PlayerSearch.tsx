import axios from 'axios'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import { useEffect } from 'react'
import { Player } from '@common/types'
import useDebounce from 'hooks/useDebounce'
import styles from './AddGame.module.scss'

type SearchProps = {
  setPlayers: (players: Player[]) => void
  closeSearch: () => void
}

const PlayerSearch = ({ setPlayers, closeSearch }: SearchProps) => {
  const [query, setQuery] = useDebounce<string>('', 1000)

  useEffect(() => {
    const search = async (q: string) => {
      const res = await axios.get(`${NEXT_PUBLIC_API_URL}/player`, {
        params: { query: q },
      })
      setPlayers(res.data)
    }
    const isEmpty = query.length === 0
    if (!isEmpty) {
      search(query)
    } else {
      closeSearch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.searchIcon}>
        <img src="/images/search-icon.svg" alt="search icon" />
      </div>
      <input onChange={({ target }) => setQuery(target.value)} placeholder="Search for player..." />
    </div>
  )
}

export default PlayerSearch
