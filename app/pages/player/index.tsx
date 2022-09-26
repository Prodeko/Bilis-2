import { Player } from '@common/types'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import axios from 'axios'
import { FunctionComponent } from 'react'

interface PlayerPageProps {
  initialPlayers: Player[]
}

const PlayerPage: FunctionComponent<PlayerPageProps> = ({ initialPlayers }) => {
  return (
    <div>
      {initialPlayers.map(player => (
        <div>{player.firstName}</div>
      ))}
    </div>
  )
}

export async function getServerSideProps() {
  const res = await axios.get(`${NEXT_PUBLIC_API_URL}/player?query=`)
  const initialPlayers = res.data as Player[]
  return { props: { initialPlayers } }
}

export default PlayerPage
