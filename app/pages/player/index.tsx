import PlayerLandingLayout from '@components/Layout/PlayerLandingLayout'
import SearchContainer from '@components/Layout/PlayerLandingLayout/SearchContainer'
import PlayerSearch from '@components/utility/PlayerSearch'
import AddPlayerButton from '@components/Player/AddPlayerButton'
import Header from '@components/Player/Header'

const PlayerPage = () => {
  return (
    <PlayerLandingLayout>
      <AddPlayerButton />
      <SearchContainer>
        <Header />
        <PlayerSearch variation="landing" />
      </SearchContainer>
    </PlayerLandingLayout>
  )
}

export default PlayerPage
