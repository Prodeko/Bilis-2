import type { NextPage } from "next";
import React, { useState } from 'react'
import SidebarButton from "../components/SidebarButton";
import SideBarSearchBar from "../components/SideBarSearchBar";
import { FiHome, FiBarChart2, FiSearch } from "react-icons/fi";


const Sidebar: NextPage = () => {
  const [expandPartial, setExpandPartial] = useState(false)
  const [expandFull, setExpandFull] = useState(false)

  const expandP = () => {
    setExpandPartial(!expandPartial)
  }

  const expandF = () => {
    setExpandFull(!expandFull)
  }

  return (
    <div className={`flex flex-col h-screen w-36 fixed bg-prodekoBlue ${expandPartial ? 'w-52' : 'w-36'} ${expandFull ? 'w-1/4' : 'w-36'} duration-200 transition-background`}>
      <SidebarButton marginP={expandPartial} marginF={expandFull} to="/">
        <FiHome size="42" />
      </SidebarButton>
      <SidebarButton marginP={expandPartial} marginF={expandFull} to="/stats">
        <FiBarChart2 size="42" />
      </SidebarButton>
      <SideBarSearchBar marginP={expandPartial} marginF={expandFull} onMouseEnter={expandP} onClick={expandF} >
        <FiSearch size="42" />
      </SideBarSearchBar>
    </div>
  );
};

export default Sidebar;
