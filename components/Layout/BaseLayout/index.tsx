import { ReactNode } from 'react'

import styles from './BaseLayout.module.scss'
import Sidebar from './Sidebar'
import { useAutoAnimate } from '@formkit/auto-animate/react'

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
    </div>
  )
}

export default BaseLayout
