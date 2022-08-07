import { ReactNode } from 'react'
import { useStateValue } from '@state/index'
import styles from './Searchbar.module.scss'

interface Props {
  children: ReactNode
}

const Searchbar = ({ children }: Props) => {
  // const [state, dispatch] = useStateValue()
  return (
    <div className={styles.searchbar}>
      <div>{children}</div>
    </div>
  )
}

export default Searchbar
