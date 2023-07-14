import FilmDetail, { FilmDetailEmpty } from "./components/FilmDetail";
import { FilmRow } from "./components/FilmRow";
import "./styles/FilmDetail.css";
import "./FilmLibrary.css";
import { useEffect, useState, useMemo } from "react";

function FilmLibrary() {
  const [selectedFilm, setSelectedFilm] = useState("");
  const [showFavorites, setShowFavorites] = useState([]);
  const [fetchedFilms, setFetchedFilms] = useState([]);
  const [updatedFilms, setUpdatedFilms] = useState([]);
  const [isFavoFilmCategorySelected, setIsFavoFilmCategorySelected] =
    useState(false);
  const [isFavoFilmsClicked, setIsFavoFilmsClicked] = useState(false);

  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const options = useMemo(
    () => ({
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzk4MWU3MzU3OGM4NjA2M2JkNDEzOGMzOTVjNjA3NCIsInN1YiI6IjY0YWU4ZmI5NjZhMGQzMDBlMzc2MzVmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9OfkxY7ueaHH2iVbzyk6-J3Hmg3sIUtRlkp2W_hAkj8",
      },
    }),
    []
  );

  const allFilms = () => {
    setUpdatedFilms(fetchedFilms);
    setIsFavoFilmCategorySelected(false);
  };

  const favoFilms = () => {
    setUpdatedFilms(showFavorites);
    setIsFavoFilmsClicked(true);
    setIsFavoFilmCategorySelected(true);
  };

  const getMovieDetail = async (movieID) => {
    await fetch(
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
      setUpdatedFilms(fetchedFilms);
      setIsFavoFilmsClicked(false);
      setIsFavoFilmCategorySelected(false);
    }
  }, [
    isFavoFilmsClicked,
    showFavorites,
    isFavoFilmCategorySelected,
    fetchedFilms,
  ]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2022&sort_by=popularity.desc",
          options
        );
        const data = await response.json();
        setFetchedFilms(data.results);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovies();
  }, [options]);

  useEffect(() => {
    setUpdatedFilms(fetchedFilms);
  }, [fetchedFilms]);

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
            <span className="section-count">{fetchedFilms.length}</span>
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
            title={film.original_title}
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
