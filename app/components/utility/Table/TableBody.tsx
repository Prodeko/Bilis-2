import type { Player } from '@common/types'
import TableBodyRow from './TableBodyRow'

interface Props {
  infoAttrs: Array<(keyof Player)[]>
  statsAttrs: Array<(keyof Player)[]>
  styles: { readonly [key: string]: string }
  players: Player[]
}

const attributesToData = (player: Player, attrs: Array<(keyof Player)[]>): (string | number)[] => {
  const inputs: (string | number)[] = []
  attrs.forEach(attrList => {
    const data = attrList.map(attr => player[attr]).join(' ')
    inputs.push(data)
  })
  return inputs
}

const TableBody = ({ infoAttrs, statsAttrs, players, styles }: Props) => {
  return (
    <tbody className={styles.body}>
      {players.map((player, index) => {
        const infoInputs = attributesToData(player, infoAttrs)
        infoInputs.unshift(index + 1) // Adds player position
        const statsInputs = attributesToData(player, statsAttrs)

        return (
          <TableBodyRow
            key={player.id}
            styles={styles}
            infoInputs={infoInputs}
            statsInputs={statsInputs}
          />
        )
      })}
    </tbody>
  )
}

export default TableBody
