import { NewProfileLayoutOuter } from "@components/Player/NewProfileLayout/Outer"
import Header from "@components/ui/Header/Player"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
}

const EditLayout = ({ children }: Props) => {
  return (
    <NewProfileLayoutOuter>
      <Header />
      {children}
    </NewProfileLayoutOuter>
  ) 
}

export default EditLayout