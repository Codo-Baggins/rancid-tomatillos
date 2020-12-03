import React from "react"
import './Nav.scss'
import tomatillo from '../assets/tomatillo.png'

//import MovieContainer from '../MovieContainer/MovieContainer'

function Nav(props) {
  return (
    <nav className="page-nav">
      Rancid Tomatillos
      <img title="Home Button" src={ tomatillo } className="home-button" onClick={ props.handleSubmit }/>
    </nav>
  )
}

export default Nav;