import { KeyboardEventHandler, useState } from 'react'
import type { WithId } from '@common/types'
import Router from 'next/router'

const useKeyPress = <T extends WithId>(arr: Array<T>, baseRoute?: string) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0)

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = e => {
    switch (e.key) {
      case 'ArrowUp':
        setSelectedIdx(Math.max(0, selectedIdx - 1))
        break

      case 'ArrowDown':
        setSelectedIdx(Math.min(arr.length, selectedIdx + 1))
        break

      case 'Enter':
        if (baseRoute) {
          const id = arr[selectedIdx].id
          Router.push(`${baseRoute}/${id}`)
        }
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
