import { Dropdown, DropdownProps, Input, InputProps } from '.'
import { ComponentProps } from 'react'

import styles from './Input.module.scss'

type DivProps = ComponentProps<'div'>

type Props = DivProps & InputProps & DropdownProps

export const InputDropdown = ({
  arr,
  IconLeadingProps,
  IconTrailingProps,
  inputId,
  emptyArrayText,
  showDropdown,
  selectedIdx,
  ...props
}: Props) => {
  return (
    <div className={styles.wrapper} {...props}>
      <Input
        inputId={inputId}
        IconLeadingProps={IconLeadingProps}
        IconTrailingProps={IconTrailingProps}
        {...props}
      />
      <Dropdown
        arr={arr}
        emptyArrayText={emptyArrayText}
        showDropdown={showDropdown}
        selectedIdx={selectedIdx}
        {...props}
      />
    </div>
  )
}
