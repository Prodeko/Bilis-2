import type { NextPage } from 'next'
import Sidebar from './Sidebar'

type Props = {
  children: JSX.Element
}


const Layout: NextPage<Props> = ({ children }) => {
  return(
    <div>
      <Sidebar />
      <div className="ml-36 bg-gray-50 h-screen">
        {children}
      </div> 
    </div>
  )
}

export default Layout