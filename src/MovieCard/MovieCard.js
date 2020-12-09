import React from "react";
import "./MovieCard.scss";
import { Link } from "react-router-dom";

const MovieCard = (props) => {
  const { imgUrl, id, title, released, handleClick } = props;

  return (
    <Link to={`/movie/${id}`}>
      <section
        className="movie-card"
        id={id}
        onClick={(event) => handleClick(id)}
      >
        <img className="movie-img" src={imgUrl} alt={title} />
        <h4 className="movie-title">{title}</h4>
        <p>{released}</p>
      </section>
    </Link>
  );
};

export default MovieCard;
