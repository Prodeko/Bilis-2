import PlayerLandingLayout from '@components/Layout/PlayerLandingLayout'
import SearchContainer from '@components/Player/SearchContainer'
import Header from '@components/ui/Header/Player'

const PlayerPage = () => {
  return (
    <PlayerLandingLayout>
      <Header includeAddPlayerButton />
      <SearchContainer />
    </PlayerLandingLayout>
  )
}

export default PlayerPage
