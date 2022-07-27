import Paragraph from '@atoms/Paragraph'
import LeaderboardCard from '@molecules/LeaderboardCard'

const Leaderboard = (): JSX.Element => {
  return (
    <div className="leaderboard-card">
      <Paragraph variation="l">All time leaderboard</Paragraph>
      <LeaderboardCard position={1} points={3600} emoji={'😜'} name="Leevi Jäkälä" />
      <LeaderboardCard position={2} points={1200} emoji={'😜'} name="Leevi Jäkälä" />
      <LeaderboardCard position={3} points={3600} emoji={'😜'} name="Leevi Jäkälä" />
    </div>
  )
}

export default Leaderboard
