import React from "react";
import "../styles/FilmRow.css";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const FilmRow = (props) => {
  const yearAndDate = new Date(props.releaseDate);
  const [favorite, setFavorite] = useState(null);
  const [queueStatus, setQueueStatus] = useState("add_to_queue");

  const toggleReadMore = () => {
    if (props.selectedFilm !== props.film) {
      props.getMovieDetail(props.id);
    }
    if (props.selectedFilm === props.film) {
      props.getMovieDetail("");
    }
  };

  const toggleFavorite = () => {
    if (favorite !== "FAVES") {
      setFavorite("FAVES");
      const filmsList = [...props.showFavorites, props.film];
      props.setShowFavorites(filmsList);
      setQueueStatus("remove_from_queue");
    }

    if (favorite === "FAVES") {
      setFavorite(null);
      const filteredList = props.showFavorites.filter((f) => f !== props.film);
      props.setShowFavorites(filteredList);
      setQueueStatus("add_to_queue");
    }
  };

  useEffect(() => {}, [props.showFavorites]);

  return (
    <div className="FilmRow">
      <img
        src={`https://image.tmdb.org/t/p/w780/${props.posterURL}`}
        alt={`${props.title} film poster`}
      />
      <div className="film-summary">
        <h3>{props.title}</h3>
        <p>{yearAndDate.getFullYear()}</p>
        <div className="actions">
          <button className="action" onClick={toggleFavorite}>
            <Link>
              <span className="material-icons">{queueStatus}</span>
            </Link>
          </button>
          <button className="action" onClick={toggleReadMore}>
            <Link to={`/films/${props.film.id}`}>
              <span className="material-icons">read_more</span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
