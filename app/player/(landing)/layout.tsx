import { ReactNode } from 'react'

import { PlayerLayoutOuter } from '@components/Player/PlayerLayout/Outer'
import Header from '@ui/Header/Player'

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
