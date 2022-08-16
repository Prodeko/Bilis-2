import type { PlayerExtended } from '@common/types'
import TableBodyRow from './TableBodyRow'

interface Props {
  infoAttrs: Array<(keyof PlayerExtended)[]>
  statsAttrs: Array<(keyof PlayerExtended)[]>
  styles: { readonly [key: string]: string }
  players: PlayerExtended[]
  filter: string | undefined
}

const attributesToData = (
  player: PlayerExtended,
  attrs: Array<(keyof PlayerExtended)[]>
): (string | number)[] => {
  const inputs: (string | number)[] = []
  attrs.forEach(attrList => {
    const data = attrList.map(attr => player[attr]).join(' ')
    inputs.push(data)
  })
  return inputs
}

const filterPlayers = (player: PlayerExtended, filter: string | undefined): Boolean => {
  return (
    !filter || // no filter defined
    String(player.id).startsWith(filter) || // matching user id
    player.firstName.toLowerCase().startsWith(filter) || // matching first name
    player.lastName.toLowerCase().startsWith(filter) ||
    player.fullName.toLowerCase().startsWith(filter)
  )
}

const TableBody = ({ infoAttrs, statsAttrs, players, styles, filter }: Props) => {
  return (
    <tbody className={styles.body}>
      {players
        .filter(player => filterPlayers(player, filter))
        .map(player => {
          const infoInputs = attributesToData(player, infoAttrs)
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
