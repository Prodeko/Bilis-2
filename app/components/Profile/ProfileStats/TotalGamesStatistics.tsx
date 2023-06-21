import ProfileStat from './ProfileStat'

type Props = {
  totalGames: number
}

const TotalGamesStatistics = ({ totalGames }: Props) => {
  return (
    <ProfileStat
      label="Total Games"
      subStatistics={[{ label: 'All time', value: totalGames.toString() }]}
    />
  )
}

export default TotalGamesStatistics
