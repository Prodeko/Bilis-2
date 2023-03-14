import { ComponentProps, MouseEvent } from 'react'
import type { IconType } from 'react-icons'

import { ButtonIcon } from '@ui/ButtonIcon'

import styles from './Input.module.scss'

type BaseInputProps = ComponentProps<'input'>

export interface InputProps extends BaseInputProps {
  IconLeadingProps: {
    Icon: IconType
  }
  IconTrailingProps?: {
    Icon: IconType
    onClick: () => void
    onMouseDown: (e: MouseEvent<HTMLButtonElement>) => void
  }
  inputId: string
}

/**
 * Returns an input component
 *
 * @param IconLeadingProps - Props for an icon positioned before the input field
 * @param IconTrailingProps - Props for an icon positioned after the input field
 * @param inputId - Id for the input field, connects label and input field together
 * @returns Input component
 */
export const Input = ({ IconLeadingProps, IconTrailingProps, inputId, ...props }: InputProps) => {
  return (
    <div className={styles.container} style={props.style}>
      {IconLeadingProps && (
        <label className={styles.iconLeading} htmlFor={inputId}>
          <IconLeadingProps.Icon size={24} />
        </label>
      )}
      <input id={inputId} className={styles.input} {...props} />
      {IconTrailingProps && (
        <ButtonIcon
          onClick={IconTrailingProps.onClick}
          onMouseDown={IconTrailingProps.onMouseDown}
          Icon={IconTrailingProps.Icon}
          variation="close"
        />
      )}
    </div>
  )
}
