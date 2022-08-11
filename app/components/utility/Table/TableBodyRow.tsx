interface Props {
  styles: { readonly [key: string]: string }
  infoInputs: (string | number)[]
  statsInputs: (string | number)[]
}

const TableBodyRow = ({ styles, infoInputs, statsInputs }: Props) => {
  return (
    <tr className={styles.bodyrow}>
      <div className={styles.info}>
        {infoInputs.map(name => (
          <td key={name}>{name}</td>
        ))}
      </div>
      <div className={styles.stats}>
        {statsInputs.map(name => (
          <td key={name}>{name}</td>
        ))}
      </div>
    </tr>
  )
}

export default TableBodyRow
