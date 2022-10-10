import { Player } from '@common/types'
import PlayerLandingLayout from '@components/Layout/PlayerLandingLayout'
import SearchContainer from '@components/Layout/PlayerLandingLayout/SearchContainer'
import PlayerSearch from '@components/Player/PlayerSearch'
import Header from '@components/Player/PlayerSearch/Header'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import axios from 'axios'
import usePlayers from 'hooks/usePlayers'
import { FunctionComponent, useState } from 'react'

interface PlayerPageProps {
  initialPlayers: Player[]
}

const PlayerPage = ({ initialPlayers }: PlayerPageProps) => {
  return (
    <PlayerLandingLayout>
      <SearchContainer>
        <Header>Player Search</Header>
        <PlayerSearch initialPlayers={initialPlayers} />
      </SearchContainer>
    </PlayerLandingLayout>
  )
}

export async function getServerSideProps() {
  const res = await axios.get(`${NEXT_PUBLIC_API_URL}/player?query=`)
  const initialPlayers = res.data as Player[]
  return { props: { initialPlayers } }
}

export default PlayerPage
