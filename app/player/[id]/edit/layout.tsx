import { PlayerLayoutOuter } from "@components/Player/PlayerLayout/Outer"
import Header from "@components/ui/Header/Player"
import { ReactNode } from "react"

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