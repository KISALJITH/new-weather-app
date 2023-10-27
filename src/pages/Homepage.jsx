import React from 'react'
import "./../styles/homepage.css"
import Footer from '../components/Footer'
import Header from '../components/Header'
import Card from '../components/Card'
import Searchbar from '../components/Searchbar'


function Homepage() {
  return (
    <div className='background'>
    <Header />
    <Searchbar />
    <Card />
    <Footer/>
    
    </div>

    
        
  )
}

export default Homepage