import FilmDetail from "./FilmDetail";

import "./FilmLibrary.css";
import { FilmRow } from "./components/FilmRow";
import TMDB from "./TMDB";

function FilmLibrary() {
  return (
    <div className="FilmLibrary">
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>
        <div className="film-list-filters">
          <button className="film-list-filter is-active">
            ALL
            <span className="section-count">3</span>
          </button>
          <button className="film-list-filter">
            FAVES
            <span className="section-count">1</span>
          </button>
        </div>

        {TMDB.films.map((film) => (
          <FilmRow
            key={film.id}
            id={film.id}
            title={film.title}
            releaseDate={film.release_date}
            overView={film.overview}
            posterURL={film.poster_path}
          />
        ))}
      </div>

      <div className="film-details">
        <h1 className="section-title">DETAILS</h1>
        <FilmDetail />
      </div>
    </div>
  );
}

export default FilmLibrary;
