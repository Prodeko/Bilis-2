import React from 'react'

import { getSeasons } from '@server/db/seasons'

import EditSeason from './EditSeason'
import styles from './Season.module.scss'
import SeasonForm from './seasonForm'

const SeasonsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  if (searchParams?.password !== process.env.ADMIN_PASSWORD) return null
  const seasons = await getSeasons()

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Seasons List</h1>
      <ul className={styles.seasonsList}>
        {seasons.map((season, index) => (
          <li key={index} className={styles.seasonItem}>
            {season.name ? `${season.name}: ` : ''}
            {season.start.toLocaleDateString('fi-FI')} - {season.end.toLocaleDateString('fi-FI')}
            <EditSeason id={season.id} />
          </li>
        ))}
      </ul>
      <SeasonForm />
    </div>
  )
}

export default SeasonsPage
