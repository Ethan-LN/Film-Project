import FilmDetail, { FilmDetailEmpty } from "./components/FilmDetail";
import { FilmRow } from "./components/FilmRow";
import "./styles/FilmDetail.css";
import "./FilmLibrary.css";
import { useEffect, useState } from "react";
import TMDB from "./TMDB";

function FilmLibrary() {
  const [selectedFilm, setSelectedFilm] = useState("");
  const [showFavorites, setShowFavorites] = useState([]);
  const [updatedFilms, setUpdatedFilms] = useState(TMDB.films);
  const [isFavoFilmCategorySelected, setIsFavoFilmCategorySelected] =
    useState(false);
  const [isFavoFilmsClicked, setIsFavoFilmsClicked] = useState(false);
  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const allFilms = () => {
    setUpdatedFilms(TMDB.films);
    setIsFavoFilmCategorySelected(false);
  };

  const favoFilms = () => {
    setUpdatedFilms(showFavorites);
    setIsFavoFilmsClicked(true);
    setIsFavoFilmCategorySelected(true);
  };

  const options = { method: "GET", headers: { accept: "application/json" } };

  const getMovieDetail = (movieID) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieID}?api_key=${TMDB_API_KEY}&language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setSelectedFilm(response);
        // Set the selectedFilm state
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (isFavoFilmCategorySelected & isFavoFilmsClicked) {
      setUpdatedFilms(showFavorites);
    } else {
      setUpdatedFilms(TMDB.films);
      setIsFavoFilmsClicked(false);
      setIsFavoFilmCategorySelected(false);
    }
  }, [isFavoFilmsClicked, showFavorites, isFavoFilmCategorySelected]);

  return (
    <div className="FilmLibrary">
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>
        <div className="film-list-filters">
          <button
            className={`film-list-filter ${
              !isFavoFilmsClicked ? "is-active" : ""
            }`}
            onClick={allFilms}
          >
            ALL
            <span className="section-count">{TMDB.films.length}</span>
          </button>
          <button
            className={`film-list-filter ${
              !isFavoFilmsClicked ? "is-active" : ""
            }`}
            onClick={favoFilms}
          >
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
            getMovieDetail={getMovieDetail}
          />
        ))}
      </div>

      <div className="film-details">
        <h1 className="section-title">DETAILS</h1>
        {selectedFilm === "" ? (
          <FilmDetailEmpty />
        ) : (
          <FilmDetail
            title={selectedFilm.original_title}
            posterURL={selectedFilm.poster_path}
            backDropURL={selectedFilm.backdrop_path}
            tagline={selectedFilm.tagline}
            overView={selectedFilm.overview}
          />
        )}
      </div>
    </div>
  );
}

export default FilmLibrary;
