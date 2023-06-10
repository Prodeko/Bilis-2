import PlayerLandingLayout from '@components/Layout/PlayerLandingLayout'
import SearchContainer from '@components/Player/SearchContainer'
import Header from '@components/ui/Header/Stats'

const PlayerPage = () => {
  return (
    <PlayerLandingLayout>
      <Header />
      <SearchContainer />
    </PlayerLandingLayout>
  )
}

export default PlayerPage
