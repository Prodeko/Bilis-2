import { ComponentProps } from 'react'
import type { IconType } from 'react-icons'

import styles from './Button.module.scss'

export type ButtonProps = ComponentProps<'button'>
type Variation = 'destructive'

interface Props extends ButtonProps {
  variation: Variation
  text?: string
  Icon?: IconType
}

export const Button = ({ text, variation, Icon, ...props }: Props) => {
  return (
    <button {...props} className={styles[variation]}>
      {text && <span>{text}</span>}
      {Icon && <span>{<Icon className={styles.icon} />}</span>}
    </button>
  )
}
