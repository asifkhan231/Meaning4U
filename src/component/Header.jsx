import React from 'react'
import { SvgIcon } from '@mui/material'
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material'

function Header({lightMode,setLightMode}) {
  return (
    <div className='header'>
      <h4>meaning4u</h4>
      <button className='mode'>
        <SvgIcon onClick={()=> setLightMode(!lightMode)} style={{color:"#FFC7ED"}} component={lightMode? LightModeOutlined:DarkModeOutlined}/>
      </button>
    </div>
  )
}

export default Header
