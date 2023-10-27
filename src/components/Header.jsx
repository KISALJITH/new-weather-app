import React from 'react'
import "./../styles/header.css"
import icon from "./../images/main-icon.png"

function Header() {
  return (
    <div className='header-outer'>
        <img src={icon} />
        <h2 className='main-title'>Weather App</h2>
    </div>
  )
}

export default Header