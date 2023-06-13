import { ComponentProps } from 'react'

import styles from './Header.module.scss'

type h1Props = ComponentProps<'h1'>

interface Props extends h1Props {
  title: string
}

const HeaderTitle = ({ title, ...props }: Props) => {
  return (
    <h1 {...props} className={styles.title}>
      {title}
    </h1>
  )
}

export default HeaderTitle
