import { KeyboardEventHandler, useState } from 'react'

import type { WithId } from '@common/types'
import { createSmoothScrollFn } from '@common/utils/helperFunctions'

const useKeyPress = <T extends WithId>(
  arr: Array<T>,
  enterFunction: (e: T) => void,
  smoothScrollTargetID?: string
) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0)
  const smoothScroll = smoothScrollTargetID ? createSmoothScrollFn(smoothScrollTargetID) : () => ''

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = event => {
    switch (event.key) {
      case 'ArrowUp':
        setSelectedIdx(Math.max(0, selectedIdx - 1))
        smoothScroll()
        break

      case 'ArrowDown':
        setSelectedIdx(Math.min(arr.length - 1, selectedIdx + 1))
        smoothScroll()
        break

      case 'Enter':
        // eslint-disable-next-line no-case-declarations
        if (arr.length > 0) {
          const e = arr[selectedIdx]
          enterFunction(e)
        }
        break
      default:
        break
    }
  }

  return {
    handleKeyPress,
    selectedIdx,
    setSelectedIdx,
  }
}

export default useKeyPress
