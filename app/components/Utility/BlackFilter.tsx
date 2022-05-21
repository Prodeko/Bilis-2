import type { NextPage } from 'next'

interface Props {
  zLevel: string
  enabled: boolean
}

const BlackFilter: NextPage<Props> = ({ zLevel, enabled }) => {
  return (
    <div
      className={`${zLevel} h-screen w-screen bg-gradient-to-r from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.7)] ${
        enabled ? 'absolute' : 'hidden'
      }`}
    ></div>
  )
}

export default BlackFilter
