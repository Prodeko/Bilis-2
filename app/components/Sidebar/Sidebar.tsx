import type { NextPage } from 'next'
import Image from 'next/image'
import React, { useState } from 'react'
import SidebarButton from './SidebarButton'
import SideBarSearchBar from './SideBarSearchBar'
import BlackFilter from '../Utility/BlackFilter'
import { FiHome, FiBarChart2, FiSearch } from 'react-icons/fi'
import logoPic from '../../common/images/prodekoLogoShade.png'

const Sidebar: NextPage = () => {
  const [expandPartial, setExpandPartial] = useState(false)
  const [expandFull, setExpandFull] = useState(false)

  const expandP = () => {
    setExpandPartial(!expandPartial)
  }

  const expandF = () => {
    setExpandFull(!expandFull)
    setExpandPartial(false)
  }

  return (
    <>
      <aside
        className={`bg-prodekoBlue fixed h-screen duration-200 transition-all z-30 ${
          expandFull
            ? 'w-1/4 shadow-[0_25px_50px_-12px_rgba(0,0,0,1)]'
            : `${expandPartial ? 'w-48' : 'w-32'}`
        }`}
      >
        <div
          className={`grid grid-rows-[1fr_120px] grid-cols-1 gap-4 h-screen w-full  justify-start`}
        >
          <div className="flex flex-col gap-4 pt-4 px-4 w-full flex-1">
            <SidebarButton to="/">
              <FiHome size="42" />
            </SidebarButton>
            <SidebarButton to="/stats">
              <FiBarChart2 size="42" />
            </SidebarButton>
            <SideBarSearchBar
              marginP={expandPartial}
              marginF={expandFull}
              onMouseEnter={expandP}
              onClick={expandF}
            >
              <FiSearch size="42" />
            </SideBarSearchBar>
          </div>
          <div className="align-self-end px-2">
            <Image src={logoPic} width={110} height={110} alt="Prodeko logo" />
          </div>
        </div>
      </aside>
      <BlackFilter zLevel="z-20" enabled={expandFull} />
    </>
  )
}

export default Sidebar
