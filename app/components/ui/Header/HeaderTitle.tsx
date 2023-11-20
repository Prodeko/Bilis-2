import { ComponentProps } from 'react'

import { getCurrentSeason } from '@server/db/seasons'

import styles from './Header.module.scss'

type h1Props = ComponentProps<'h1'>

interface Props extends h1Props {
  title: string
  seasonal?: boolean
}

const HeaderTitle = async ({ title, seasonal, ...props }: Props) => {
  const currentSeason = await getCurrentSeason()
  return (
    <div className={styles.titleContainer}>
      <h1 {...props} className={styles.title}>
        {title}
      </h1>
      {currentSeason && seasonal && <h2 className={styles.seasonTitle}>{currentSeason.name}</h2>}
    </div>
  )
}

export default HeaderTitle
