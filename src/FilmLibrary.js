import FilmDetail from "./components/FilmDetail";
import { FilmDetailEmpty } from "./components/FilmDetail";
import { FilmRow } from "./components/FilmRow";
import "./styles/FilmDetail.css";
import "./FilmLibrary.css";
import TMDB from "./TMDB";
import { useState } from "react";

function FilmLibrary() {
  const [selectedFilm, setSelectedFilm] = useState(null);

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
            film={film}
            selectedFilm={selectedFilm}
            setSelectedFilm={setSelectedFilm}
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
