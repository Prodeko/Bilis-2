"use client"

import PlayerSearchLink from '@ui/PlayerSearch/PlayerSearchLink'
import { useState } from 'react'

import styles from './PlayerLanding.module.scss'

const PlayerPage = () => {
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
    <div className={styles.wrapper}>
      <div className={extended ? styles.searchContainer__extended : styles.searchContainer}>
        <h1 className={styles.header}>Player Search</h1>
        <PlayerSearchLink visible={visible} onClick={onClick} onBlur={onBlur} />
      </div>
    </div>
  )
}

export default PlayerPage
