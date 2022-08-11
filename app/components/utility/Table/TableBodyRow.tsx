import { round } from 'lodash'

interface Props {
  styles: { readonly [key: string]: string }
  infoInputs: (string | number)[]
  statsInputs: (string | number)[]
}

const TableBodyRow = ({ styles, infoInputs, statsInputs }: Props) => {
  return (
    <tr className={styles.bodyrow}>
      <div className={styles.info}>
        {infoInputs.map(info => (
          <td key={info}>{info}</td>
        ))}
      </div>
      <div className={styles.stats}>
        {statsInputs.map(stat => {
          const finalStat = Number.isNaN(Number(stat)) ? stat : round(stat)
          return <td key={stat}>{finalStat}</td>
        })}
      </div>
    </tr>
  )
}

export default TableBodyRow
