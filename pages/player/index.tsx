import PlayerLandingLayout from '@components/Layout/PlayerLandingLayout'
import AddPlayerButton from '@components/Player/AddPlayerButton'
import SearchContainer from '@components/Player/SearchContainer'

const PlayerPage = () => {
  return (
    <PlayerLandingLayout>
      <AddPlayerButton />
      <SearchContainer />
    </PlayerLandingLayout>
  )
}

export default PlayerPage
