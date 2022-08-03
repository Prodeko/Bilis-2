import { getCssClass } from '@common/utils/helperFunctions'
import styles from './Button.module.scss'

interface Props {
  onClick: () => void
  variation: 'positive' | 'negative'
  children: string
}

const Button = ({ onClick, variation, children }: Props): JSX.Element => {
  return (
    <button type="button" className={getCssClass(styles, variation)} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
