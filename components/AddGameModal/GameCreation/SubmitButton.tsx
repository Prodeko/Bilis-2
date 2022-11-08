interface Props {
  onSubmit: () => void
  isActive: boolean
}

const SubmitButton = ({ onSubmit, isActive }: Props) => {
  return (
    <button disabled={!isActive} onClick={onSubmit} type="button">
      Add Game
    </button>
  )
}

export default SubmitButton
