import styles from './Button.module.scss'

interface Props {
  onClick: () => void
  variation: 'positive' | 'negative'
  children: string
}

const Button = ({ onClick, variation, children }: Props): JSX.Element => {
  const baseClass = 'btn'
  const classes = `${styles[baseClass]} ${styles[`${baseClass}__${variation}`]}`

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
