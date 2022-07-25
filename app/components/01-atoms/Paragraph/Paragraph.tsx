import type { NextPage } from 'next'
import styles from './Paragraph.module.scss'

interface ParagraphProps {
  variation: 'XS' | 'S' | 'M' | 'L' | 'XL'
  children: string | number
}

const Paragraph: NextPage<ParagraphProps> = ({ variation, children }) => {
  return <p className={`${styles.paragraph} ${styles[`paragraph__${variation}`]}`}>{children}</p>
}

export default Paragraph
