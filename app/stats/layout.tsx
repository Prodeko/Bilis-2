import { ReactNode } from 'react'

import { Header } from '@ui/Header/Stats'

import styles from './Layout.module.scss'

interface Props {
  children: ReactNode
}

const StatsLayout = ({ children }: Props) => {
  return (
    <div className={styles.layout}>
      <Header />
      {children}
    </div>
  )
}

export const dynamic = 'force-dynamic'

export default StatsLayout
