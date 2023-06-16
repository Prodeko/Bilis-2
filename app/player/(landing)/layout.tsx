import { ReactNode } from 'react'
import Header from '@ui/Header/Player'

import { PlayerLayoutOuter } from '@components/Player/PlayerLayout/Outer'

interface Props {
  children: ReactNode
}

const PlayerLandingLayout = ({ children }: Props) => {
  return (
    <PlayerLayoutOuter>
      <Header />
      {children}
    </PlayerLayoutOuter>
  )
}

export default PlayerLandingLayout
