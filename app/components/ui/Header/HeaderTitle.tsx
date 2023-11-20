import { ComponentProps } from 'react'

import { Season } from '@common/types'

import styles from './Header.module.scss'

type h1Props = ComponentProps<'h1'>

interface Props extends h1Props {
  title: string
  currentSeason?: Season | null
}

const HeaderTitle = async ({ title, currentSeason, ...props }: Props) => {
  return (
    <div className={styles.titleContainer}>
      <h1 {...props} className={styles.title}>
        {title}
      </h1>
      {currentSeason && <h2 className={styles.seasonTitle}>{currentSeason.name}</h2>}
    </div>
  )
}

export default HeaderTitle
