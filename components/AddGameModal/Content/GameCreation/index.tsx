import SubmitButton from './SubmitButton'
import UnderTableInput from './UnderTableInput'
import styles from './GameCreation.module.scss'
import { useContext } from 'react'
import { ModalContext } from '../ModalContextProvider'

interface Props {
  onSubmit: () => void
}

const GameCreation = ({ onSubmit }: Props) => {
  const { game, setGameField } = useContext(ModalContext)

  const isActive = Boolean(game.winnerId && game.loserId)

  return (
    <div className={styles.buttonWrapper}>
      <SubmitButton isActive={isActive} onSubmit={onSubmit} />
      <UnderTableInput onChange={setGameField('underTable')} />
    </div>
  )
}

export default GameCreation
