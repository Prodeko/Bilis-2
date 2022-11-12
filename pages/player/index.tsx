import Router from 'next/router'

import PlayerLandingLayout from '@components/Layout/PlayerLandingLayout'
import SearchContainer from '@components/Player/SearchContainer'
import AddPlayerButton from '@components/Player/AddPlayerButton'
import Header from '@components/Player/Header'
import PlayerSearchLink from '@components/utility/PlayerSearch/PlayerSearchLink'

const PlayerPage = () => {
  return (
    <PlayerLandingLayout>
      <AddPlayerButton />
      <SearchContainer>
        <Header />
        <PlayerSearchLink handleSelect={({ id }) => Router.push(`player/${id}`)} />
      </SearchContainer>
    </PlayerLandingLayout>
  )
}

export default PlayerPage
