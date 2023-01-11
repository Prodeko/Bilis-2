import { ReactNode } from 'react'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import styles from './BaseLayout.module.scss'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: ReactNode
}

const BaseLayout = ({ children }: LayoutProps): JSX.Element => {
  const [parent, _enableAnimations] = useAutoAnimate<HTMLDivElement>({ duration: 250 })

  return (
    <div className={styles.grid}>
      <Sidebar />
      <main ref={parent} className={styles.layout}>
        {children}
      </main>
      <p className={styles.versioning}>Version 1.1.1 - Raikku 🐔</p>
    </div>
  )
}

export default BaseLayout
