import type { NextPage } from 'next'

type Props = {
  title: string
}


const List: NextPage<Props> = ({ title }) => {
  return(
    <div className='shadow-xl bg-gray-100 flex-shrink rounded-md border-gray-200 border w-11/12'>
      <h2 className='text-6xl font-bold p-8'>{title}</h2>
    </div>
  )
}

export default List