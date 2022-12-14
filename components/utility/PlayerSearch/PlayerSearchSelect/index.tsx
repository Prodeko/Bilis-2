import axios from 'axios'
import { ChangeEventHandler, Dispatch, SetStateAction, useState } from 'react'
import { FiX } from 'react-icons/fi'

import type { Player } from '@common/types'
import type { PieChartProps } from '@components/Profile/ProfileCharts/PlayerComparison'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import useKeyPress from '@hooks/useKeyPress'
import usePlayers from '@hooks/usePlayers'

import styles from './PlayerSearchSelect.module.scss'

interface Props {
  currentPlayerId: number
  setPieChartProps: Dispatch<SetStateAction<PieChartProps | undefined>>
}

const PlayerSearchSelect = ({ currentPlayerId, setPieChartProps }: Props) => {
  const [placeholder, setPlaceholder] = useState<string>('Search for a player')
  const [visible, setVisible] = useState<boolean>(false)
  const { players, setQuery } = usePlayers(400)
  const [parent, _enableAnimations] = useAutoAnimate<HTMLUListElement>({ duration: 200 })

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setQuery(e.target.value)
    setVisible(true)
    setSelectedIdx(0)
  }

  const handleSelect = async (opposingPlayer: Player) => {
    if (opposingPlayer.id) {
      try {
        const response = await axios.get(`/api/player/mutual-stats`, {
          params: { id1: currentPlayerId, id2: opposingPlayer.id },
        })
        const data = response.data as PieChartProps
        setPlaceholder(`${opposingPlayer.firstName} ${opposingPlayer.lastName}`)
        setPieChartProps(data)
      } catch (e) {
        console.error(e)
      }
    } else {
      console.warn('Trying to select player for player comparison but failed')
    }
  }
  const { handleKeyPress, selectedIdx, setSelectedIdx } = useKeyPress(players, handleSelect)

  return (
    <div className={styles.container}>
      <label htmlFor="queue" className={visible ? styles.search__visible : styles.search}>
        <input
          className={styles.input}
          id="queue"
          placeholder={placeholder}
          onBlur={() => setVisible(false)}
          onClick={() => setVisible(true)}
          onKeyDown={handleKeyPress}
          onChange={handleChange}
        />
        <button
          className={visible ? styles.button__visible : styles.button}
          onClick={() => setVisible(false)}
        >
          <FiX />
        </button>
      </label>
      <ul ref={parent} className={visible ? styles.results__visible : styles.results}>
        {players.map((player, i) => (
          <li
            key={player.id}
            className={`${styles.player} ${selectedIdx === i ? styles.selected : ''}`}
            onClick={() => handleSelect(players[i])}
          >
            {`#${player.id} ${player.firstName} "${player.nickname}" ${player.lastName}`}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PlayerSearchSelect
