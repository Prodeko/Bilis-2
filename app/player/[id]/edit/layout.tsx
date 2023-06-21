import { ReactNode } from 'react'

import { PlayerLayoutOuter } from '@components/Player/PlayerLayout/Outer'
import Header from '@components/ui/Header/Player'

interface Props {
  children: ReactNode
}

const EditLayout = ({ children }: Props) => {
  return (
    <PlayerLayoutOuter>
      <Header />
      {children}
    </PlayerLayoutOuter>
  )
}

export default EditLayout
