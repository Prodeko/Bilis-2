import SubmitButton from './SubmitButton'
import UnderTableInput from './UnderTableInput'
import styles from './GameCreation.module.scss'

interface Props {
  onSubmit: () => void
  setGameField: (val: any) => void
}

const GameCreation = ({ onSubmit, setGameField }: Props) => {
  return (
    <div className={styles.buttonWrapper}>
      <SubmitButton onSubmit={onSubmit} />
      <UnderTableInput onChange={setGameField} />
    </div>
  )
}

export default GameCreation
