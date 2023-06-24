import { ComponentProps } from 'react'

import { Player } from '@common/types'
import { formatFullName } from '@common/utils/helperFunctions'

import styles from './Input.module.scss'

export type ListItemProps = ComponentProps<'li'>

interface EmptyProps extends ListItemProps {
  text: string
}

interface PlayerItemProps extends ListItemProps {
  player: Player
}

/**
 * Returns a list item with formatted player name
 *
 * @remarks Can also take in any "li" html element props
 *
 * @param player - Player object
 * @returns Player list item
 */
export const PlayerListItem = ({ player, ...props }: PlayerItemProps) => {
  return (
    <li className={styles.listItem} {...props}>
      {formatFullName(player, false, true)}
    </li>
  )
}

/**
 * Returns a list item when the array is empty
 *
 * @remarks Can also take in any "li" html element props
 *
 * @param text - Displayed text string
 * @returns List item with displayed text
 */
export const EmptyArray = ({ text, ...props }: EmptyProps) => {
  return (
    <li className={styles.emptyArray} {...props}>
      {text}
    </li>
  )
}
