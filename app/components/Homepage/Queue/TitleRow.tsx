import { Dispatch, SetStateAction, useMemo } from 'react'
import Select, { SingleValue } from 'react-select'

import type { Player } from '@common/types'
import PlayerSearchLink from '@components/utility/PlayerSearch/PlayerSearchLink'
import usePlayers from 'hooks/usePlayers'

import styles from './Queue.module.scss'

interface OptionType {
  label: string
  value: Player
}

interface Props {
  queue: Player[]
  setQueue: Dispatch<SetStateAction<Player[]>>
}

const TitleRow = ({ queue, setQueue }: Props) => {
  const { players } = usePlayers(0)

  const options: OptionType[] = useMemo(
    () =>
      players
        .filter(player => !queue.some(queuePlayer => queuePlayer.id === player.id))
        .map(player => ({
          label: `#${player.id} ${player.firstName} ${player.lastName}`,
          value: player,
        })),
    [players, queue]
  )

  const handleChange = (newValue: SingleValue<OptionType>) => {
    if (newValue?.value) {
      setQueue([...queue, newValue.value])
    } else {
      // eslint-disable-next-line no-console
      console.warn('Trying to add to queue: ', newValue?.value)
    }
  }
  return (
    <div className={styles.titlerow}>
      <h2 className={styles.title}>Queue</h2>
      <span className={styles.search}>
        <PlayerSearchLink />
      </span>
    </div>
  )
}

export default TitleRow
