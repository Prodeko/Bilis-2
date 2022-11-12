/* eslint-disable prettier/prettier */
import { ReactNode } from 'react'

import styles from './Player.module.scss'

const SearchContainer = ({ children }: { children: ReactNode }) => {
  return <div className={styles.searchContainer}>{children}</div>
}

export default SearchContainer
