import styles from './AddGame.module.scss'

interface Props {
  onClose: () => void
}

const CloseButton = ({ onClose }: Props) => {
  return (
    <button className={styles.closeButton} type="button" onClick={onClose}>
      <img src="/images/close-cross.svg" alt="close icon" />
    </button>
  )
}

export default CloseButton
