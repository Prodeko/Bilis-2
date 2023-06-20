import { ChangeEventHandler, Dispatch, SetStateAction, useState } from 'react'
import { FiX } from 'react-icons/fi'

import { pieChartProps, type PieChartProps, type Player } from '@common/types'
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
        const searchParams = new URLSearchParams({ 
          currentPlayerId: currentPlayerId.toString(), 
          opposingPlayerId: opposingPlayer.id.toString() 
        })
        const res = await fetch(`/api/player/mutual-stats?${searchParams}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          }
        })
        const data = await res.json() as PieChartProps
        const pieProps = pieChartProps.parse(data)
        setPlaceholder(`${opposingPlayer.firstName} ${opposingPlayer.lastName}`)
        setPieChartProps(pieProps)
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
