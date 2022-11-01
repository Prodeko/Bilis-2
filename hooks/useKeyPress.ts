import { KeyboardEventHandler, useState } from 'react'

import type { WithId } from '@common/types'

const useKeyPress = <T extends WithId>(arr: Array<T>, enterFunction: (e: T) => void) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0)

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = event => {
    switch (event.key) {
      case 'ArrowUp':
        setSelectedIdx(Math.max(0, selectedIdx - 1))
        break

      case 'ArrowDown':
        setSelectedIdx(Math.min(arr.length - 1, selectedIdx + 1))
        break

      case 'Enter':
        // eslint-disable-next-line no-case-declarations
        const e = arr[selectedIdx]
        enterFunction(e)
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
