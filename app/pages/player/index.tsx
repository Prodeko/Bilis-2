import { Player } from '@common/types'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import axios from 'axios'
import usePlayers from 'hooks/usePlayers'
import { FunctionComponent } from 'react'

interface PlayerPageProps {
  initialPlayers: Player[]
}

const PlayerPage: FunctionComponent<PlayerPageProps> = ({ initialPlayers }) => {
  const { players: queriedPlayers, query, setQuery } = usePlayers()

  const players = queriedPlayers ?? initialPlayers
  return (
    <div>
      <input placeholder="Search for a player" onChange={e => setQuery(e.target.value)} />
      {players.map(player => (
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
