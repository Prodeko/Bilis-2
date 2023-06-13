import type { Variation } from '.'

import styles from './TitleRow.module.scss'

interface Props {
  variation: Variation
}

export const Title = ({ variation }: Props) => {
  return <h2 className={styles.title}>{variation}</h2>
}
