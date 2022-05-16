import type { NextPage } from 'next'

type Props = {
  children: JSX.Element | JSX.Element[]
}

const PlayerList: NextPage<Props> = ({ children }) => {
  return (
    <div className="flex flex-1 basis-2/5 flex-wrap items-center shadow-xl bg-gray-100 rounded-md border-gray-200 border">
      {children}
    </div>
  )
}

export default PlayerList
