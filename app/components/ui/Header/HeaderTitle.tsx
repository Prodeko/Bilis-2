import { ComponentProps } from 'react'

import { getCurrentSeason } from '@server/db/seasons'

import styles from './Header.module.scss'

type h1Props = ComponentProps<'h1'>

interface Props extends h1Props {
  title: string
}

const HeaderTitle = async ({ title, ...props }: Props) => {
  const season = await getCurrentSeason()
  return (
    <div className={styles.titleContainer}>
      <h1 {...props} className={styles.title}>
        {title}
      </h1>
      {season && <h2 className={styles.seasonTitle}>Season: {season.name}</h2>}
    </div>
  )
}

export default HeaderTitle
