/* eslint-disable prettier/prettier */
import { useState } from 'react'

import Header from './Header'
import PlayerSearchLink from '@components/utility/PlayerSearch/PlayerSearchLink'
import styles from './SearchContainer.module.scss'

const SearchContainer = () => {
  const [extended, setExtended] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)

  const onBlur = () => {
    setVisible(false)
    setExtended(false)
  }

  const onClick = () => {
    if (!extended) {
      setExtended(true)
      setTimeout(() => setVisible(true), 1000)
    }
  }

  return (
    <div className={extended ? styles.searchContainer__extended : styles.searchContainer}>
      <Header />
      <PlayerSearchLink
        visible={visible}
        setVisible={setVisible}
        onClick={onClick}
        onBlur={onBlur}
      />
    </div>
  )
}

export default SearchContainer
