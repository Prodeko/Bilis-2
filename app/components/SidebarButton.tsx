import type { NextPage } from 'next'

const SidebarButton: NextPage = ({children}) => {
  return(
    <div className="bg-gray-100 rounded-full w-28 h-28 mx-auto my-4 flex items-center justify-center duration-1000 shadow-2xl transition-transform hover:cursor-pointer hover:rounded-3xl">
      {children}
    </div>
  )
}

export default SidebarButton