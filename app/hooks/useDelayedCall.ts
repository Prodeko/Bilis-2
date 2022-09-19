import { useState } from 'react'

type Props = {
  f: (...args: any) => unknown
  delayMs: number
}

const useDelayedCall = ({ f, delayMs = 1000 }: Props) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined)

  const delayedCall = (f: (...args: any) => unknown) => {
    if (timer) {
      clearTimeout(timer)
    }
    const t = setTimeout(f, delayMs)
    setTimer(t)
  }

  return delayedCall
}

export default useDelayedCall
