import { useModalState } from '@state/Modal'

interface Props {
  onSubmit: () => void
  isActive: boolean
}

const SubmitButton = ({ onSubmit, isActive }: Props) => {
  const [{ refs }] = useModalState()
  return (
    <button disabled={!isActive} onClick={onSubmit} type="button" ref={refs?.addGame}>
      Add Game
    </button>
  )
}

export default SubmitButton
