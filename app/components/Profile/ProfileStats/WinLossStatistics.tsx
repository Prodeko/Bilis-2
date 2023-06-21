import ProfileStat from './ProfileStat'

type Props = {
  wonGames: number
  lostGames: number
}

const WinLossStatistics = ({ wonGames, lostGames }: Props) => {
  return (
    <ProfileStat
      label="W/L"
      subStatistics={[{ label: 'All time', value: `${wonGames} / ${lostGames}` }]}
    />
  )
}

export default WinLossStatistics
