import type { PlayerWithStats } from '@common/types'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import SearchIcon from '@public/images/search-icon.svg'
import axios from 'axios'
import useDebounce from 'hooks/useDebounce'
import Image from 'next/image'
import { Dispatch, KeyboardEventHandler, SetStateAction, useContext, useEffect } from 'react'
import { ModalContext } from '../../ModalContextProvider'
import styles from './ChoosePlayer.module.scss'

interface Props {
  side: 'winner' | 'loser'
  forceReRender: Dispatch<SetStateAction<null>>
}

const PlayerSearch = ({ side, forceReRender }: Props) => {
  // Note about displaying logic: First the recent players get displayed. When the player starts typing in the input bar, the recency doesn't matter anymore, Instead, players matching the filter will be returned in alphabetical order.

  const [query, setQuery] = useDebounce<string>('', 400)
  const {
    setSelectedIdx,
    setPlayers,
    resetPlayers: closeSearch,
    refs,
    setFocus,
  } = useContext(ModalContext)

  useEffect(() => {
    const search = async (q: string) => {
      const res = await axios.get(`/api/player`, {
        params: { query: q, stats: true },
      })
      setPlayers(res.data)
    }
    const isEmpty = query.length === 0
    if (!isEmpty) {
      search(query)
    } else {
      closeSearch(side)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    if (!setSelectedIdx || !setFocus) return null

    switch (e.key) {
      case 'ArrowUp':
        setSelectedIdx(i => i - 1)
        break

      case 'ArrowDown':
        setSelectedIdx(i => i + 1)
        break

      case 'ArrowRight':
        setFocus('loser')
        break

      case 'ArrowLeft':
        setFocus('winner')
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
        ref={refs?.[side]}
      />
    </div>
  )
}

export default PlayerSearch
