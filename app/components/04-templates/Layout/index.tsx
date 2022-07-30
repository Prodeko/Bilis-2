import type { ReactNode } from 'react'
import { getCssClass } from '@common/utils/helperFunctions'
import styles from './Layout.module.scss'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return <div className={getCssClass(styles)}>{children}</div>
}

export default Layout
