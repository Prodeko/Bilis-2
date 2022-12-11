import { useContext } from 'react'
import { ModalContext } from '../ModalContextProvider'

interface Props {
  onSubmit: () => void
  isActive: boolean
}

const SubmitButton = ({ onSubmit, isActive }: Props) => {
  const { refs } = useContext(ModalContext)
  return (
    <button disabled={!isActive} onClick={onSubmit} type="button" ref={refs?.addGame}>
      Add Game
    </button>
  )
}

export default SubmitButton
