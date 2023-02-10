import { ComponentProps } from 'react'
import type { IconType } from 'react-icons'

import { ButtonIcon } from '@ui/ButtonIcon'

import styles from './Input.module.scss'

type InputProps = ComponentProps<'input'>

interface Props extends InputProps {
  IconLeading?: IconType
  IconTrailing?: IconType
  id: string
}

export const Input = ({ IconLeading, IconTrailing, id, ...props }: Props) => {
  return (
    <div className={styles.container}>
      {IconLeading && <label htmlFor={id}></label>}
      <input id={id} className={styles.input} {...props} />
      {IconTrailing && <ButtonIcon variation="close" />}
    </div>
  )
}
