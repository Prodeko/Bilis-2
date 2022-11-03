import styles from './GameCreation.module.scss'

type Props = {
  onChange: (checked: boolean) => void
}

const UnderTableInput = ({ onChange }: Props) => {
  return (
    <div className={styles.underTable}>
      <input id="checkbox" type="checkbox" onChange={v => onChange(v.target.checked)} />
      <label htmlFor="checkbox">Under-table</label>
    </div>
  )
}

export default UnderTableInput
