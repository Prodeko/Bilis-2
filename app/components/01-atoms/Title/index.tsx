import { getCssClass } from '@common/utils/helperFunctions'
import { ReactNode } from 'react'
import styles from './Title.module.scss'

interface TitleProps {
  children: ReactNode
  variation: 'primary' | 'secondary' | 'tertiary'
}

const Title = ({ children, variation }: TitleProps): JSX.Element => {
  if (variation === 'primary') {
    return <h1 className={getCssClass(styles, variation)}>{children}</h1>
  }
  if (variation === 'secondary') {
    return <h2 className={getCssClass(styles, variation)}>{children}</h2>
  }
  return <h3 className={getCssClass(styles, variation)}>{children}</h3>
}

export default Title
