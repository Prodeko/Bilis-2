import { KeyboardEventHandler, useState } from 'react'
import type { WithId } from '@common/types'

const useKeyPress = <T extends WithId>(arr: Array<T>, enterFunction: (id: number) => void) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0)

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = e => {
    switch (e.key) {
      case 'ArrowUp':
        setSelectedIdx(Math.max(0, selectedIdx - 1))
        break

      case 'ArrowDown':
        setSelectedIdx(Math.min(arr.length - 1, selectedIdx + 1))
        break

      case 'Enter':
        const id = arr[selectedIdx].id
        enterFunction(id)
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
