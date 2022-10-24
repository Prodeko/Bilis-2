import usePlayers from '@hooks/usePlayers'
import type { Player } from '@common/types'
import styles from './PlayerSearchSelect.module.scss'
import Select, { SingleValue } from 'react-select'

interface OptionType {
  label: string
  value: Player
}

interface Props {
  handleClick: (newValue: SingleValue<OptionType>) => Promise<void>
}

const PlayerSearchSelect = ({ handleClick }: Props) => {
  const { players } = usePlayers(0)

  const options = players.map(player => ({
    label: `${player.firstName} ${player.lastName}`,
    value: player.id,
  }))

  return (
    <Select
      className={styles.search}
      options={options}
      onChange={handleClick} // No clue why ide is complaining about this, code works fine right now
      placeholder="Search for a player..."
    />
  )
}

export default PlayerSearchSelect
