import type { NextPage } from 'next'
import styles from './Paragraph.module.scss'
import { getCssClass } from '@common/utils/helperFunctions'

interface ParagraphProps {
  variation: 'xxxs' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl'
  children: string | number
}

const Paragraph: NextPage<ParagraphProps> = ({ variation, children }) => {
  return <p className={getCssClass(styles, variation)}>{children}</p>
}

export default Paragraph
