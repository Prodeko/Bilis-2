import { ReactNode } from 'react'
import styles from '@components/Layout/Layout.module.scss'
import { useStateValue } from '@state/index'

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
