import { NEXT_PUBLIC_API_URL } from '@config/index'
import SearchIcon from '@public/images/search-icon.svg'
import {
  decrementSelectedIdx,
  incrementSelectedIdx,
  resetPlayers,
  setFocus,
  setPlayers,
  setSelectedIdx,
  useModalState,
} from '@state/Modal'
import axios from 'axios'
import useDebounce from 'hooks/useDebounce'
import Image from 'next/image'
import { KeyboardEventHandler, useContext, useEffect } from 'react'
import styles from './ChoosePlayer.module.scss'

interface Props {
  side: 'winner' | 'loser'
  onChoose: () => void
}

const PlayerSearch = ({ side, onChoose }: Props) => {
  // Note about displaying logic: First the recent players get displayed. When the player starts typing in the input bar, the recency doesn't matter anymore, Instead, players matching the filter will be returned in alphabetical order.

  const [query, setQuery] = useDebounce<string>('', 400)
  const [{ refs, focus, game }, dispatch] = useModalState()

  useEffect(() => {
    const search = async (q: string) => {
      const res = await axios.get(`/api/player`, {
        params: { query: q, stats: true },
      })
      dispatch(setPlayers(side, res.data))
    }
    const isEmpty = query.length === 0
    if (!isEmpty) {
      search(query)
    } else {
      dispatch(resetPlayers(side))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    switch (e.key) {
      case 'ArrowUp':
        dispatch(decrementSelectedIdx())
        break

      case 'ArrowDown':
        dispatch(incrementSelectedIdx())
        break

      case 'ArrowRight':
        dispatch(setFocus('loser'))
        break

      case 'ArrowLeft':
        dispatch(setFocus('winner'))
        break

      case 'Enter':
        onChoose()
        break
    }
  }

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor="search" className={styles.searchIcon}>
        <Image src={SearchIcon} width={20} alt="Search Icon" />
      </label>
      <input
        id="search"
        onChange={({ target }) => setQuery(target.value)}
        placeholder="Search for player..."
        autoComplete="off"
        onKeyDown={handleKeyDown}
        onClick={() => {
          if (focus === side) return
          dispatch(setSelectedIdx(0))
          dispatch(setFocus(side))
        }}
        ref={refs?.[side]}
      />
    </div>
  )
}

export default PlayerSearch
