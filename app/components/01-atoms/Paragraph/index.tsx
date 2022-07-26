import type { NextPage } from 'next'
import styles from './Paragraph.module.scss'
import { getCssClass } from '@common/utils/helperFunctions'

interface ParagraphProps {
  variation: 'XXXS' | 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'
  children: string | number
}

const Paragraph: NextPage<ParagraphProps> = ({ variation, children }) => {
  return <p className={getCssClass(styles, variation)}>{children}</p>
}

export default Paragraph
