import type { Variation } from '.'
import { ComponentProps } from 'react'

import styles from './TitleRow.module.scss'

type HeadingProps = ComponentProps<'h2'>

interface Props extends HeadingProps {
  variation: Variation
}

export const Title = ({ variation, ...props }: Props) => {
  return (
    <h2 {...props} className={styles.title}>
      {variation}
    </h2>
  )
}
