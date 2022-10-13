import PlayerLandingLayout from '@components/Layout/PlayerLandingLayout'
import SearchContainer from '@components/Layout/PlayerLandingLayout/SearchContainer'
import PlayerSearch from '@components/Player/PlayerSearch'
import AddPlayerButton from '@components/Player/PlayerSearch/AddPlayerButton'
import Header from '@components/Player/PlayerSearch/Header'

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
