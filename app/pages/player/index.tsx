import PlayerLandingLayout from '@components/Layout/PlayerLandingLayout'
import SearchContainer from '@components/Layout/PlayerLandingLayout/SearchContainer'
import PlayerSearchLink from '@components/utility/PlayerSearch/PlayerSearchLink'
import AddPlayerButton from '@components/Player/AddPlayerButton'
import Header from '@components/Player/Header'

const PlayerPage = () => {
  return (
    <PlayerLandingLayout>
      <AddPlayerButton />
      <SearchContainer>
        <Header />
        <PlayerSearchLink />
      </SearchContainer>
    </PlayerLandingLayout>
  )
}

export default PlayerPage
