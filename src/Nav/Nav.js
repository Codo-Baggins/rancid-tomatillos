import React from "react"
import './Nav.scss'
import tomatillo from '../assets/tomatillo.png'
import Form from '../Form/Form'
import { Link } from 'react-router-dom'

function Nav(props) {
  return (
    <nav className="page-nav">
      <Form filterMovies={ props.filterMovies } />
      <Link to='/'>
          <p id="title">Rancid Tomatillos</p>
          <img
            title="Home Button"
            src={ tomatillo }
            className="home-button"
            onClick={ props.returnHome }
            alt="Home Button"
          />
      </Link>
    </nav>
  )
}

export default Nav;