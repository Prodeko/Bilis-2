interface Props {
  styles: { readonly [key: string]: string }
  infoNames: string[]
  statsNames: string[]
}

const TableHeadRow = ({ styles, infoNames, statsNames }: Props) => {
  return (
    <tr className={styles.headrow}>
      <div className={styles.info}>
        {infoNames.map(name => (
          <th key={name}>{name}</th>
        ))}
      </div>
      <div className={styles.stats}>
        {statsNames.map(name => (
          <th key={name}>{name}</th>
        ))}
      </div>
    </tr>
  )
}

export default TableHeadRow
