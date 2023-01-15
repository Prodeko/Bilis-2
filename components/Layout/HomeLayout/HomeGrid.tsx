import { ReactNode, useEffect } from 'react'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import { setQueue, useQueueState } from '@state/Queue'

import styles from './HomeLayout.module.scss'

const HomeGrid = ({ children }: { children: ReactNode }) => {
  const [, dispatch] = useQueueState()
  useEffect(() => {
    dispatch(setQueue())
  }, [])

  const [parent] = useAutoAnimate<HTMLDivElement>({ duration: 250 })
  return (
    <div ref={parent} className={styles['grid__content']}>
      {children}
    </div>
  )
}

export default HomeGrid
