/* eslint-disable prettier/prettier */
import { useState } from 'react'

import PlayerSearchLink from '@components/utility/PlayerSearch/PlayerSearchLink'

import Header from './Header'
import styles from './SearchContainer.module.scss'

const SearchContainer = () => {
  const [extended, setExtended] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)

  const onBlur = () => {
    setVisible(false)
    setTimeout(() => setExtended(false), 400) // The same length as extendind transformation in PlayerSearchLink.moudule.scss %resultContainer placeholder class
  }

  const onClick = () => {
    if (!extended) {
      setExtended(true)
      setTimeout(() => setVisible(true), 700) // // The same length as extendind transformation in PlayerSearchLink.moudule.scss %resultContainer placeholder class
    }
  }

  return (
    <div className={extended ? styles.searchContainer__extended : styles.searchContainer}>
      <Header />
      <PlayerSearchLink visible={visible} onClick={onClick} onBlur={onBlur} />
    </div>
  )
}

export default SearchContainer
