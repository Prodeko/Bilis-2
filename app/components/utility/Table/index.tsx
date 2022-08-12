import type { Player } from '@common/types'
import TableHead from './TableHead'
import TableBody from './TableBody'
import leaderboardStyles from './Leaderboard.module.scss'
import modalStyles from './Modal.module.scss'

type TableVariation = 'leaderboard' | 'modal'

interface Props {
  players: Player[]
  variation: TableVariation
}

interface Settings {
  styles: { readonly [key: string]: string }
  infoAttrs: Array<(keyof Player)[]>
  statsAttrs: Array<(keyof Player)[]>
  infoNames: string[]
  statsNames: string[]
}

const Table = ({ players, variation }: Props) => {
  const getStyles = (tableVariation: TableVariation): Settings => {
    switch (tableVariation) {
      case 'leaderboard':
        return {
          styles: leaderboardStyles,
          infoAttrs: [['emoji', 'firstName', 'lastName']],
          statsAttrs: [['elo']],
          infoNames: ['Position', 'Player'],
          statsNames: ['Elo'],
        }
      case 'modal':
        return {
          styles: modalStyles,
          infoAttrs: [['emoji', 'firstName', 'lastName']],
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
  const { styles, infoAttrs, statsAttrs, infoNames, statsNames } = getStyles(variation)

  return (
    <table className={styles.table}>
      <TableHead infoNames={infoNames} statsNames={statsNames} styles={styles} />
      <TableBody infoAttrs={infoAttrs} statsAttrs={statsAttrs} styles={styles} players={players} />
    </table>
  )
}

export default Table
