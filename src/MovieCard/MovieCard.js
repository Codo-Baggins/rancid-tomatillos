import React from "react";
import "./MovieCard.scss";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const MovieCard = (props) => {
  const { imgUrl, id, title, avgRating, handleClick } = props;
  const rating = Number(avgRating).toFixed(1)
  return (
    <Link to={`/movie/${id}`} className="moviecard-link">
      <section
        className="movie-card"
        id={id}
        onClick={(event) => handleClick(id)}
      >
        <img className="movie-img" src={imgUrl} alt={title} />
        <h4 className="movie-title">{title}</h4>
        <p>{rating}</p>
      </section>
    </Link>
  );
};

export default MovieCard;

MovieCard.propTypes = {
  imgUrl: PropTypes.string,
  id: PropTypes.number,
  title: PropTypes.string,
  avgRating: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  handleClick: PropTypes.func
}