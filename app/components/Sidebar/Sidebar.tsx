import type { NextPage } from "next";
import Image from 'next/image'
import React, { useState } from 'react'
import SidebarButton from "./SidebarButton";
import SideBarSearchBar from "./SideBarSearchBar";
import { FiHome, FiBarChart2, FiSearch } from "react-icons/fi";
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
    <div className={`flex flex-col h-screen w-36 fixed bg-prodekoBlue ${expandPartial ? 'w-52' : 'w-36'} ${expandFull ? 'w-1/4' : 'w-36'} duration-200 transition-background z-10`}>
      <div className="flex-none">
        <SidebarButton to="/">
          <FiHome size="42" />
        </SidebarButton>
      </div>
      <div className="flex-none">
        <SidebarButton to="/stats">
          <FiBarChart2 size="42" />
        </SidebarButton>
      </div>
      <div className="grow mb-10">
        <SideBarSearchBar marginP={expandPartial} marginF={expandFull} onMouseEnter={expandP} onClick={expandF} >
          <FiSearch size="42" />
        </SideBarSearchBar>
      </div>
      <div className='flex-none ml-2 mb-2 w-32 h-32'>
        <Image src={logoPic}
          width={500}
          height={500}
          alt="Prodeko logo" />
      </div>
    </div>
  );
};

export default Sidebar;
