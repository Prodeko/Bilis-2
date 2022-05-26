import { GetStaticProps, GetStaticPaths, NextPage, InferGetStaticPropsType } from 'next'
import { PlayerWithStats, MutualStatsPlayer } from '../../common/types'
import List from '../../components/Utility/List'
import TimeSeriesChart from '../../components/Graphs/TimeSeriesChart'
import PieChart from '../../components/Graphs/PieChart'
import PlayerHeader from '../../components/PlayerScreen/PlayerHeader'

const dummyEloData = [
  400, 410, 420.5, 410, 415, 399, 380, 370, 365, 355, 365, 370, 364, 358, 370, 381, 391, 398, 405,
  410, 402, 413, 425, 433, 440, 437, 444, 431, 425, 437, 425, 421,
]

const playerColor = '#000'

const dummyPlayer1 = {
  name: 'Aleks',
  mutualGamesWon: 14,
  favoriteColor: '#F7F',
}

const PlayerScreen: NextPage = ({ player }: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(player)
  return (
    <div className="h-screen grid grid-rows-[3fr_5fr]">
      <PlayerHeader player={player} color={playerColor} />
      <div className="grid grid-cols-[3fr_2fr] h-full p-10 gap-6">
        <List>
          <div className="flex flex-col gap-4 p-4">
            <h2>All time</h2>
            <TimeSeriesChart
              eloData={dummyEloData}
              chartName={'All Time Stats'}
              dataName={'All Time'}
              color={player.favoriteColor}
              height={'270%'}
            />
          </div>
        </List>
        <div className="flex flex-col gap-6 p-14">
          <h2>Keskinäiset pelit</h2>
          <PieChart player1={player} player2={dummyPlayer1} height={'100%'} />
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const pid = context.params?.playerid
  const res = await fetch(`http://localhost:3000/api/players/${pid}`)
  const player: PlayerWithStats = await res.json()

  console.log(player)
  return {
    props: {
      player,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  }
}

export default PlayerScreen
