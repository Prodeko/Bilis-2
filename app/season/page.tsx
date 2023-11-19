import React from 'react'

import { getSeasons } from '@server/db/seasons'

import styles from './Season.module.scss'
import SeasonForm from './seasonForm'

const SeasonsPage = async () => {
  const seasons = await getSeasons()

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Seasons List</h1>
      <ul className={styles.seasonsList}>
        {seasons.map((season, index) => (
          <li key={index} className={styles.seasonItem}>
            {season.name ? `${season.name}: ` : ''}
            {new Date(season.start).toLocaleDateString()} -{' '}
            {new Date(season.end).toLocaleDateString()}
          </li>
        ))}
      </ul>
      <SeasonForm />
    </div>
  )
}

export default SeasonsPage
