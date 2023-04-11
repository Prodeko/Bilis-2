import PlayerLandingLayout from '@components/Layout/PlayerLandingLayout'
import SearchContainer from '@components/Player/SearchContainer'
import Header from '@components/ui/Header'
import HeaderTitle from '@components/ui/Header/HeaderTitle'
import AddPlayerButton from '@ui/AddPlayerButton'

const PlayerPage = () => {
  return (
    <PlayerLandingLayout>
      <Header
        TitleComponent={<HeaderTitle title="Player" />}
        RightComponent={<AddPlayerButton path="/player/new" text="create a new player" />}
        leftColumnSpan={4}
        rightColumnSpan={4}
      />
      <SearchContainer />
    </PlayerLandingLayout>
  )
}

export default PlayerPage
