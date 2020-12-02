import React from 'react'
import './MovieCard.scss'


const MovieCard = (props) => {
  const { imgUrl, id, title, released } = props;
  return (
    <section className="movie-card" id={id}>
      <img className="movie-img" src={imgUrl} alt={title} />
      <h4>{title}</h4>
      <p>{released}</p>
    </section>

  )
}

export default MovieCard