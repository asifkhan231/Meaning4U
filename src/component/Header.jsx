import React from 'react'
import { SvgIcon } from '@mui/material'
import { DarkMode } from '@mui/icons-material'

function Header() {
  return (
    <div className='header'>
      <h4>meaning4u</h4>
      <button className='mode'>
        <SvgIcon component={DarkMode}/>
      </button>
    </div>
  )
}

export default Header
