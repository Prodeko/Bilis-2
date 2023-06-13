import PlayerLandingLayout from 'app/components/Layout/PlayerLandingLayout'
import SearchContainer from 'app/components/Player/SearchContainer'
import Header from 'app/components/ui/Header/Player'

const PlayerPage = () => {
  return (
    <PlayerLandingLayout>
      <Header includeAddPlayerButton />
      <SearchContainer />
    </PlayerLandingLayout>
  )
}

export default PlayerPage
