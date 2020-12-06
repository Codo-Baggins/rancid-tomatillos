import React from "react"
import './Nav.scss'
import tomatillo from '../assets/tomatillo.png'
import Form from '../Form/Form'

function Nav(props) {
  return (
    <nav className="page-nav">
      <Form onChange={ props.filterMoviesByTitle }/>
      Rancid Tomatillos
      <img
        title="Home Button"
        src={ tomatillo }
        className="home-button"
        onClick={ props.returnHome }
        alt="Home Button"
      />
    </nav>
  )
}

export default Nav;