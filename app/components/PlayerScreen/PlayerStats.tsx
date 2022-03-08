import List from '../List'

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
    <List>
      <div className='box-border h-full p-6'>
        <h2 className='pb-4'>Pelaajan statsit</h2>
        <h4 className='pl-6'><strong>Pelatut pelit: </strong>{playedGames}</h4>
        <h4 className='pl-6'><strong>Voitetut pelit: </strong>{wonGames}</h4>
        <h4 className='pl-6'><strong>Voittoprosentti: </strong>{wonGames / playedGames}</h4>
        <h4 className='pl-6'><strong>Seasonal ranking/elo: </strong>{seasonalRanking} / {seasonalElo}</h4>
        <h4 className='pl-6'><strong>Overall ranking/elo: </strong>{overallRanking} / {overallElo}</h4>
      </div>
    </List>
  )
}

export default PlayerStats