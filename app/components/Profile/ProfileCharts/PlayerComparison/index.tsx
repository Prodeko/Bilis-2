import styles from './PlayerComparison.module.scss'

const mockResults = [
  'Adam',
  'Alex',
  'Aaron',
  'Ben',
  'Carl',
  'Dan',
  'David',
  'Edward',
  'Fred',
  'Frank',
  'George',
  'Hal',
  'Hank',
  'Ike',
  'Raikku',
  'John',
  'Jack',
  'Joe',
  'Larry',
  'Monte',
  'Matthew',
  'Mark',
  'Nathan',
  'Otto',
  'Paul',
  'Peter',
  'Roger',
  'Roger',
  'Steve',
  'Thomas',
  'Tim',
  'Ty',
  'Victor',
  'Walter',
]

const Result = ({ name }: { name: string }) => {
  return <p className={styles.result}>{name}</p>
}

const PlayerComparison = () => {
  return (
    <div className={styles.container}>
      <input className={styles.searchBar} placeholder="Search for a player..." />
      <div className={styles.results}>
        {mockResults.map(name => (
          <Result name={name} key={name} />
        ))}
      </div>
    </div>
  )
}

export default PlayerComparison
