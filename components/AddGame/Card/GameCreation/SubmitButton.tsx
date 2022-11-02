interface Props {
  onSubmit: () => void
}

const SubmitButton = ({ onSubmit }: Props) => {
  return (
    <button onClick={onSubmit} type="button">
      Add Game
    </button>
  )
}

export default SubmitButton
