import { Player } from '@common/types'
import PlayerLandingLayout from '@components/Layout/PlayerLandingLayout'
import SearchContainer from '@components/Layout/PlayerLandingLayout/SearchContainer'
import PlayerSearch from '@components/Player/PlayerSearch'
import AddPlayerButton from '@components/Player/PlayerSearch/AddPlayerButton'
import Header from '@components/Player/PlayerSearch/Header'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import axios from 'axios'
import usePlayers from 'hooks/usePlayers'
import { FunctionComponent, useState } from 'react'

const PlayerPage = () => {
  return (
    <PlayerLandingLayout>
      <AddPlayerButton />
      <SearchContainer>
        <Header />
        <PlayerSearch />
      </SearchContainer>
    </PlayerLandingLayout>
  )
}

export default PlayerPage
