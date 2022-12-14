import { ReactNode } from 'react'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import styles from './HomeLayout.module.scss'

const HomeGrid = ({ children }: { children: ReactNode }) => {
  const [parent] = useAutoAnimate<HTMLDivElement>({ duration: 250 })
  return (
    <div ref={parent} className={styles['grid__content']}>
      {children}
    </div>
  )
}

export default HomeGrid
