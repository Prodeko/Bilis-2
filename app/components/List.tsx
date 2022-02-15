import type { NextPage } from 'next'

type Props = {
  children: JSX.Element[]
}


const List: NextPage<Props> = ({ children }) => {
  return(
    <div className='shadow-xl bg-gray-100 flex-shrink rounded-md border-gray-200 border w-11/12 h-fit'>
      {children}
    </div>
  )
}

export default List