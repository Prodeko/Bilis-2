import { GetStaticProps, GetStaticPaths, NextPage, InferGetStaticPropsType } from 'next'
import { PlayerWithStats } from '../../common/types'

const PlayerScreen: NextPage = ({ player }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const playerEmoji = String.fromCodePoint(player.emoji.slice(2))
  return (
    <div className="h-screen">
      <div className="bg-blue-600 flex items-center justify-around flex-wrap p-12 gap-16">
        <div className="flex justify-center items-center gap-28 flex-wrap">
          <div className="w-96 h-96 rounded-[50%] text-9xl bg-white flex justify-center items-center shadow-xl">
            {playerEmoji}
          </div>
          <div className=" text-white text-5xl text-center">
            <strong>
              {player.firstName}
              <i> "raikku"</i> {player.lastName}
            </strong>{' '}
            #5
          </div>
        </div>
        <div className="text-white rounded-lg border-white border-[1px] p-12 gap-4">
          <div>
            <strong>Elo:</strong> {player.elo}
          </div>
          <div>
            <strong>Suurin elo:</strong> {player.maxElo}
          </div>
          <div>
            <strong>Suurin elo:</strong> {player.maxElo}
          </div>
          <div>
            <strong>Voitetut:</strong> {player.wonGames} + <strong>Hävityt:</strong>{' '}
            {player.lostGames} = {player.wonGames + player.lostGames}
          </div>
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
    paths: [], // indicates that no page needs be created at build time
    fallback: 'blocking', // indicates the type of fallback
  }
}

export default PlayerScreen
