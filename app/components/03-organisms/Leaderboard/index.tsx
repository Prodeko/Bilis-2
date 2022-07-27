import Paragraph from '@atoms/Paragraph'
import { getCssClass } from '@common/utils/helperFunctions'
import styles from './Leaderboard.module.scss'
import LeaderboardCard from '@molecules/LeaderboardCard'
import type { HomeLeaderboard } from '@common/types'

interface Props {
  leaderboard: HomeLeaderboard
}

const Leaderboard = ({ leaderboard }: Props): JSX.Element => {
  return (
    <div className={getCssClass(styles)}>
      <Paragraph variation="l">All time leaderboard</Paragraph>
      {leaderboard.map(item => (
        <LeaderboardCard
          key={item.position}
          position={item.position}
          points={item.points}
          emoji={item.emoji}
          name={item.name}
        />
      ))}
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch('/leaderboard')
  const leaderboard = await res.json()
  return { props: { leaderboard } }
}

export default Leaderboard
