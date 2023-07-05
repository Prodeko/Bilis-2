import { ComponentProps } from 'react'

import styles from './StatsTitle.module.scss'

type HeadingProps = ComponentProps<'h2'>

interface Props extends HeadingProps {
  title: string
}

export const StatsTitle = ({ title, ...props }: Props) => {
  return (
    <h2 {...props} className={styles.title}>
      {title}
    </h2>
  )
}
