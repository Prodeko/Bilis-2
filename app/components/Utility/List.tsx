import type { NextPage } from 'next'

type Props = {
  children: JSX.Element | JSX.Element[]
}


const List: NextPage<Props> = ({ children }) => {
  return(
    <div className='relative z-10 shadow-xl p-7 bg-gray-100 box-border flex-shrink rounded-md 
      border-gray-200 border w-full'>
      {children}
    </div>
  )
}

export default List