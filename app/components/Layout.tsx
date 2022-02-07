import type { NextPage } from 'next'
import Sidebar from './Sidebar'


const Layout: NextPage = ({ children }) => {
  return(
    <div>
      <Sidebar />
      <div className="ml-36">
        {children}
      </div> 
    </div>
  )
}

export default Layout