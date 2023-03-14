import { Player, SmoothScrollId } from '@common/types'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import styles from './Input.module.scss'
import { EmptyArray, ListItemProps, PlayerListItem } from './ListItem'

export interface DropdownProps extends ListItemProps {
  arr: Player[]
  emptyArrayText: string
  showDropdown: boolean
  selectedIdx: number
  smoothScrollId: string
  rowOnClick: (player: Player) => void
}

/**
 * Returns a dropdown component that displays rows of player values
 *
 * @remarks Can also use any of the "li" html element props
 *
 * @param arr - Array of players
 * @param emptyArrayText - Displayed text when array is empty
 * @param showDropdown - Boolean value that defines if dropdown is open or closed
 * @param selextedIdx - Selected list element index
 * @param smoothScrollId - Id of the target element for smooth scroll -  TODO!
 * @param rowOnClick - onClick eventhandler for PlayerListItem
 * @returns Dropdown component
 */
export const Dropdown = ({
  arr,
  emptyArrayText,
  showDropdown,
  selectedIdx,
  smoothScrollId,
  rowOnClick,
  ...props
}: DropdownProps) => {
  const [parent, _enableAnimations] = useAutoAnimate<HTMLUListElement>({
    duration: 250,
  })
  const isSelected = (i: number) => selectedIdx === i

  return (
    <ul ref={parent} className={showDropdown ? styles.list__visible : styles.list}>
      {arr.length > 0 ? (
        arr.map((arrValue, i) => (
          <PlayerListItem
            className={isSelected(i) ? styles.selected : styles.listItem}
            id={isSelected(i) ? smoothScrollId : ''}
            key={arrValue.id}
            player={arrValue}
            onClick={() => rowOnClick(arrValue)}
            {...props}
          />
        ))
      ) : (
        <EmptyArray text={emptyArrayText} />
      )}
    </ul>
  )
}
