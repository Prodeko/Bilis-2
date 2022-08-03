import { getCssClass } from '@common/utils/helperFunctions'
import { ReactNode } from 'react'
import styles from './ScrollDiv.module.scss'

interface ScrollProps {
  children: ReactNode
}

const ScrollDiv = ({ children }: ScrollProps): JSX.Element => {
  return <div className={getCssClass(styles)}>{children}</div>
}

export default ScrollDiv
