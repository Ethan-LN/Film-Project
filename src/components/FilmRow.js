import React from "react";
import "../styles/FilmRow.css";
import { useState } from "react";

export const FilmRow = (props) => {
  const yearAndDate = new Date(props.releaseDate);
  const [favorite, setFavorite] = useState(null);
  const [queueStatus,setQueueStatus] = useState("add_to_queue")

  const toggleReadMore = () => {
    if (props.selectedFilm !== props.film) {
      props.setSelectedFilm(props.film);
    }
    if (props.selectedFilm === props.film) {
      props.setSelectedFilm(null);
    }
  };

  const toggleFavorite = () => {
    if (favorite !== "FAVE") {
      setFavorite("FAVE");
      const filmsList = [...props.showFavorites, props.film];
      props.setShowFavorites(filmsList);
      setQueueStatus("remove_from_queue")
    }

    if (favorite === "FAVE") {
      setFavorite(null);
      const filteredList = props.showFavorites.filter((f) => f !== props.film);
      props.setShowFavorites(filteredList);
      setQueueStatus("add_to_queue")
    }
  };

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
            <span className="material-icons">{queueStatus}</span>
          </button>
          <button className="action" onClick={toggleReadMore}>
            <span className="material-icons">read_more</span>
          </button>
        </div>
      </div>
    </div>
  );
};
