import styles from './Card.module.scss'

type Props = {
  onChange: (checked: boolean) => void
}

const UnderTableInput = ({ onChange }: Props) => {
  return (
    <div className={styles.underTable}>
      <input type="checkbox" onChange={v => onChange(v.target.checked)} />
      <p>Under-table</p>
    </div>
  )
}

export default UnderTableInput
