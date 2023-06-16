import { ReactNode } from 'react'
import Header from '@ui/Header/Player'

import { NewProfileLayoutOuter } from '@components/Player/NewProfileLayout/Outer'

interface Props {
  children: ReactNode
}

const PlayerLandingLayout = ({ children }: Props) => {
  return (
    <NewProfileLayoutOuter>
      <Header />
      {children}
    </NewProfileLayoutOuter>
  )
}

export default PlayerLandingLayout
