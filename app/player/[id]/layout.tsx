import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const ProfileLayout = ({ children }: Props) => {
  return <>{children}</>
}

export default ProfileLayout
