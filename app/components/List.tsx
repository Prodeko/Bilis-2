import type { NextPage } from 'next'
import LeaderboardItem from './LeaderboardItem'

type Props = {
  title: string
}


const List: NextPage<Props> = ({ title }) => {
  return(
    <div className='shadow-xl bg-gray-100 flex-shrink rounded-md border-gray-200 border w-11/12'>
      <h2 className='p-8'>{title}</h2>
      <div>
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />

      </div>
    </div>
  )
}

export default List