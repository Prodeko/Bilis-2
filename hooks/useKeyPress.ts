import axios from 'axios'
import { KeyboardEventHandler, useState } from 'react'

import type { WithId } from '@common/types'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import { addToQueue, useQueueState } from '@state/Queue'

const useKeyPress = <T extends WithId>(arr: Array<T>, enterFunction: (e: T) => void) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0)
  const [_, dispatch] = useQueueState()

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
        if (arr.length > 0) {
          const e = arr[selectedIdx]
          enterFunction(e)
        }
        break

      // opsec
      case 'Home':
        axios
          .get(`${NEXT_PUBLIC_API_URL}/player/m`)
          .then(res => res?.data ?? dispatch(addToQueue(res.data)))

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
