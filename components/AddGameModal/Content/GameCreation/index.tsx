import SubmitButton from './SubmitButton'
import UnderTableInput from './UnderTableInput'
import styles from './GameCreation.module.scss'

interface Props {
  onSubmit: () => void
  setGameField: (val: any) => void
  isActive: boolean
}

const GameCreation = ({ onSubmit, setGameField, isActive }: Props) => {
  return (
    <div className={styles.buttonWrapper}>
      <SubmitButton isActive={isActive} onSubmit={onSubmit} />
      <UnderTableInput onChange={setGameField} />
    </div>
  )
}

export default GameCreation
