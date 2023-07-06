import FilmDetail, {FilmDetailEmpty} from "./components/FilmDetail";
import { FilmRow } from "./components/FilmRow";
import "./styles/FilmDetail.css";
import "./FilmLibrary.css";
import TMDB from "./TMDB";
import { useEffect, useState } from "react";

function FilmLibrary() {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [showFavorites, setShowFavorites] = useState([]);
  const [updatedFilms, setUpdatedFilms] = useState(TMDB.films);

  const allFilms = () => {
    if (updatedFilms !== TMDB.films) {
      setUpdatedFilms(TMDB.films);
    }
  };

  const favoFilms = () => {
    if (updatedFilms !== showFavorites) {
      setUpdatedFilms(showFavorites);
    }
  };

  return (
    <div className="FilmLibrary">
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>
        <div className="film-list-filters">
          <button className="film-list-filter is-active" onClick={allFilms}>
            ALL
            <span className="section-count">{TMDB.films.length}</span>
          </button>
          <button className="film-list-filter" onClick={favoFilms}>
            FAVES
            <span className="section-count">{showFavorites.length}</span>
          </button>
        </div>

        {updatedFilms.map((film) => (
          <FilmRow
            key={film.id}
            id={film.id}
            title={film.title}
            releaseDate={film.release_date}
            overView={film.overview}
            posterURL={film.poster_path}
            film={film}
            selectedFilm={selectedFilm}
            setSelectedFilm={setSelectedFilm}
            showFavorites={showFavorites}
            setShowFavorites={setShowFavorites}
          />
        ))}
      </div>

      <div className="film-details">
        <h1 className="section-title">DETAILS</h1>
        {selectedFilm === null ? (
          <FilmDetailEmpty />
        ) : (
          <FilmDetail
            title={selectedFilm.title}
            posterURL={selectedFilm.poster_path}
            backDropURL={selectedFilm.backdrop_path}
            overView={selectedFilm.overview}
          />
        )}
      </div>
    </div>
  );
}

export default FilmLibrary;
