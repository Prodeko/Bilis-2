import Link from 'next/link'
import { ComponentProps } from 'react'
import { FiUserPlus } from 'react-icons/fi'

import styles from './AddPlayerButton.module.scss'

type ButtonProps = ComponentProps<'button'>

interface Props extends ButtonProps {
  path: string
  text: string
}

const AddPlayerButton = ({ path, text, ...props }: Props) => {
  return (
    <Link href={path}>
      <button {...props} className={styles.button}>
        <FiUserPlus className={styles.icon} />
        <span>{text}</span>
      </button>
    </Link>
  )
}

export default AddPlayerButton
