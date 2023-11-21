import Image from 'next/image'

import styles from './AddGameModal.module.scss'

interface Props {
  onClose: () => void
}

const CloseButton = ({ onClose }: Props) => {
  return (
    <button
      className={styles.closeButton}
      type="button"
      onClick={() => {
        onClose()
      }}
    >
      <Image src="/images/close-cross.svg" alt="close icon" />
    </button>
  )
}

export default CloseButton
