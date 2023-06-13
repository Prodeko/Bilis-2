import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'
import { FiUserPlus } from 'react-icons/fi'

import styles from './AddPlayerButton.module.scss'

type ButtonProps = ComponentPropsWithoutRef<'a'>

interface Props extends ButtonProps {
  path: string
  text: string
}

const AddPlayerButton = ({ path, text, ...props }: Props) => {
  return (
    <Link href={path} {...props} className={styles.button}>
      <span>{text}</span>
      <FiUserPlus className={styles.icon} />
    </Link>
  )
}

export default AddPlayerButton
