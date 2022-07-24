import styles from './Button.module.scss'
import { ClassNames } from './Button.module.scss'

interface Props {
  onClick: () => void
  variations: ClassNames[]
  children: string
}

const Button = ({ onClick, variations, children }: Props): JSX.Element => {
  const allVariations = variations.concat('btn')
  const classes = `${allVariations.map(variation => styles[variation]).join(' ')}`

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
