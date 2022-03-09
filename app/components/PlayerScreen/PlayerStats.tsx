import MainTitle from './MainTitle'
import AttributeLine from './AttributeLine'

type Props = {
  playedGames: number, 
  wonGames: number,
  seasonalRanking: number,
  seasonalElo: number,
  overallRanking: number,
  overallElo: number
}

const PlayerStats = ({ playedGames, wonGames, seasonalRanking, seasonalElo, overallRanking, overallElo }: Props): JSX.Element => {
  return (
    <div className='box-border p-6'>
      <MainTitle titleName="Pelaajan statsit" />
      <AttributeLine infoName="Pelatut pelit" info={playedGames} />
      <AttributeLine infoName="Voitetut pelit" info={wonGames} />
      <AttributeLine infoName="Voittoprosentti" info={wonGames / playedGames} />
      <AttributeLine infoName="Seasonal ranking/elo" info={`${seasonalRanking} / ${seasonalElo}`} />
      <AttributeLine infoName="Overall ranking/elo" info={`${overallRanking} / ${overallElo}`} />
    </div>
  )
}

export default PlayerStats