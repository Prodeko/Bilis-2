import axios from 'axios'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import { useEffect } from 'react'
import type { PlayerWithStats } from '@common/types'
import useDebounce from 'hooks/useDebounce'
import styles from './ChoosePlayer.module.scss'
import SearchIcon from '@public/images/search-icon.svg'
import Image from 'next/image'

type SearchProps = {
  setPlayers: (players: PlayerWithStats[]) => void
  closeSearch: () => void
}

const PlayerSearch = ({ setPlayers, closeSearch }: SearchProps) => {
  // Note about displaying logic: First the recent players get displayed. When the player starts typing in the input bar, the recency doesn't matter anymore, Instead, players matching the filter will be returned in alphabetical order.

  const [query, setQuery] = useDebounce<string>('', 400)

  useEffect(() => {
    const search = async (q: string) => {
      const res = await axios.get(`${NEXT_PUBLIC_API_URL}/player`, {
        params: { query: q, stats: true },
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
      <label htmlFor="search" className={styles.searchIcon}>
        <Image src={SearchIcon} width={20} alt="Search Icon" />
      </label>
      <input
        id="search"
        onChange={({ target }) => setQuery(target.value)}
        placeholder="Search for player..."
      />
    </div>
  )
}

export default PlayerSearch
