import { setUndertable, useModalState } from '@state/Modal'

import styles from './GameCreation.module.scss'
import SubmitButton from './SubmitButton'
import UnderTableInput from './UnderTableInput'

interface Props {
  onSubmit: () => void
}

const GameCreation = ({ onSubmit }: Props) => {
  const [{ game }, dispatch] = useModalState()

  const isActive = Boolean(game.winnerId && game.loserId)

  return (
    <div className={styles.buttonWrapper}>
      <SubmitButton isActive={isActive} onSubmit={onSubmit} />
      <UnderTableInput onChange={c => dispatch(setUndertable(c))} />
    </div>
  )
}

export default GameCreation
