import type { NextPage } from 'next'
import SidebarButton from '../components/SidebarButton'
import { FiHome, FiBarChart2, FiSearch } from 'react-icons/fi';

const Sidebar: NextPage = () => {
  return(
    <div className="h-screen w-36 bg-blue-900 fixed">
      <SidebarButton>
        <FiHome size='42'/>
      </SidebarButton>
      <SidebarButton>
        <FiBarChart2 size='42'/>
      </SidebarButton>
      <SidebarButton>
        <FiSearch size='42'/>
      </SidebarButton>
    </div>
  )
}

export default Sidebar