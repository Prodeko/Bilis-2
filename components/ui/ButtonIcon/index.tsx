import { ComponentProps } from 'react'
import { IconType } from 'react-icons'

import styles from './ButtonIcon.module.scss'

export type ButtonProps = ComponentProps<'button'>

type Variation = 'destructive' | 'close'

interface Props extends ButtonProps {
  Icon: IconType
  variation: Variation
}

export const ButtonIcon = ({ Icon, variation, ...props }: Props) => {
  return (
    <button className={styles[variation]} {...props}>
      <Icon className={styles.icon} />
    </button>
  )
}
