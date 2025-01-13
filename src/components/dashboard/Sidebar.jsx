import React, { useState } from 'react'
import './Sidebar.css'

import { SidebarData } from '../data/Data'
import { UilSignOutAlt } from "@iconscout/react-unicons";
const Sidebar = () => {

    const [selected, setSelected] = useState(0);

  return (
    <div className='Sidebar'>
        <div className='logo'>
            <img src='/images/logo.png'  alt=''  />
            <span> <span> EY </span> Editor </span>
        </div>

        <div className='menu'>
        {SidebarData.map((item, index) => {
          return (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => setSelected(index)} 
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          );
        })}
         <div className="menuItem">
          <UilSignOutAlt />
        </div>
        </div>
      
    </div>
  )
}

export default Sidebar
