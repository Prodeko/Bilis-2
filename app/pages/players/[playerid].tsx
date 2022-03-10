import { GetStaticProps, GetStaticPaths, NextPage, InferGetStaticPropsType } from 'next'
import { PlayerWithStats } from '../../common/types'

const PlayerScreen: NextPage = ({ player }: InferGetStaticPropsType<typeof getStaticProps>) => {

  return (
    <div className='h-screen'>
      <div className='h-2/5 bg-blue-600 flex items-center'>
        <div className='w-96 h-96 m-[10%] rounded-[50%] text-9xl bg-white flex justify-center items-center shadow-xl'>🦦</div>
        <div>{player.firstName} {player.lastName}</div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const pid = context.params?.playerid
  const res = await fetch(`http://localhost:3000/api/players/${pid}`)
  const player: PlayerWithStats = await res.json()

  console.log(player)
  return {
    props: {
      player,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {

  return {
      paths: [], //indicates that no page needs be created at build time
      fallback: 'blocking' //indicates the type of fallback
    }
  }



export default PlayerScreen