import TableHeadRow from './TableHeadRow'

interface Props {
  infoNames: string[]
  statsNames: string[]
  styles: { readonly [key: string]: string }
}

const TableHead = ({ infoNames, statsNames, styles }: Props) => {
  return (
    <thead className={styles.head}>
      <TableHeadRow styles={styles} infoNames={infoNames} statsNames={statsNames} />
    </thead>
  )
}

export default TableHead
