import Card from '@components/utility/Card'
import PlayerSearch from '@components/utility/PlayerSearch'

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
  return <PlayerSearch variation="profile" />
}

export default PlayerComparison
