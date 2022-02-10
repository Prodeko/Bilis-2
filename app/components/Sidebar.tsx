import type { NextPage } from "next";
import React, { useState } from 'react'
import SidebarButton from "../components/SidebarButton";
import { FiHome, FiBarChart2, FiSearch } from "react-icons/fi";


const Sidebar: NextPage = () => {
  const[expandPartial, setExpandPartial] = useState(false)
  const[expandFull, setExpandFull] = useState(false)

  const expandP = () => {
    setExpandPartial(true)
  }

  const expandF = () => {
    setExpandFull(true)
  }

  const shrink = () => {
    setExpandPartial(false)
  }

  return (
    <div className={`h-screen w-36 fixed bg-prodekoBlue ${expandPartial? 'w-40' : 'w-36'} ${expandFull? 'w-64' : 'w-36'}`}>
      <SidebarButton onMouseEnter={() => {}} onMouseLeave={() => {}} onClick={() => {}} to="/">
        <FiHome size="42" />
      </SidebarButton>
      <SidebarButton onMouseEnter={() => {}} onMouseLeave={() => {}} onClick={() => {}} to="/stats">
        <FiBarChart2 size="42" />
      </SidebarButton>
      <SidebarButton onMouseEnter={expandP} onMouseLeave={shrink} onClick={expandF} to="/">
        <FiSearch size="42" />
      </SidebarButton>
    </div>
  );
};

export default Sidebar;
