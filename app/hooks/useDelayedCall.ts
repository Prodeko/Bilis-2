import { useState } from 'react'

type Props = {
  delayMs: number
}

const useDelayedCall = ({ delayMs = 1000 }: Props) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined)

  const delayedCall = (func: (...args: any) => unknown) => {
    if (timer) {
      clearTimeout(timer)
    }
    const t = setTimeout(func, delayMs)
    setTimer(t)
  }

  return delayedCall
}

export default useDelayedCall
