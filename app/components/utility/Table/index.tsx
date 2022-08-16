import type { PlayerExtended } from '@common/types'
import TableHead from './TableHead'
import TableBody from './TableBody'
import leaderboardStyles from './Leaderboard.module.scss'
import modalStyles from './Modal.module.scss'

type TableVariation = 'leaderboard' | 'modal'

interface Props {
  players: PlayerExtended[]
  variation: TableVariation
  filter: string | undefined
}

interface Settings {
  styles: { readonly [key: string]: string }
  infoAttrs: Array<(keyof PlayerExtended)[]>
  statsAttrs: Array<(keyof PlayerExtended)[]>
  infoNames: string[]
  statsNames: string[]
}

const Table = ({ players, variation, filter }: Props) => {
  const getProps = (tableVariation: TableVariation): Settings => {
    switch (tableVariation) {
      case 'leaderboard':
        return {
          styles: leaderboardStyles,
          infoAttrs: [['position'], ['emoji', 'fullName']],
          statsAttrs: [['elo']],
          infoNames: ['Position', 'Player'],
          statsNames: ['Elo'],
        }
      case 'modal':
        return {
          styles: modalStyles,
          infoAttrs: [['position'], ['emoji', 'fullName']],
          statsAttrs: [['elo']],
          infoNames: ['Position', 'Player'],
          statsNames: ['Elo'],
        }
      default:
        return {
          styles: leaderboardStyles,
          infoAttrs: [[]],
          statsAttrs: [[]],
          infoNames: [],
          statsNames: [],
        }
    }
  }
  const { styles, infoAttrs, statsAttrs, infoNames, statsNames } = getProps(variation)

  return (
    <table className={styles.table}>
      <TableHead infoNames={infoNames} statsNames={statsNames} styles={styles} />
      <TableBody
        infoAttrs={infoAttrs}
        statsAttrs={statsAttrs}
        styles={styles}
        players={players}
        filter={filter}
      />
    </table>
  )
}

export default Table
