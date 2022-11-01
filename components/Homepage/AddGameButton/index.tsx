import Filter from '@components/utility/Filter'
import styles from './AddGameButton.module.scss'

type Props = {
  onOpen: () => void
}

const AddGameButton = ({ onOpen }: Props) => {
  // TODO refactor card to support element without cardgrid
  const inlineStyles = {
    gridColumn: '3 / 3',
    gridRow: '1 / 2',
  }

  return (
    <div
      className={styles.card}
      style={inlineStyles}
      onClick={onOpen}
      onKeyDown={onOpen}
      role="button"
      tabIndex={0}
    >
      <Filter>
        <div className={styles.center}>
          <h3>Add New Game</h3>
        </div>
      </Filter>
    </div>
  )
}

export default AddGameButton
