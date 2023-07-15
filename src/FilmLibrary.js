import FilmDetail, { FilmDetailEmpty } from "./components/FilmDetail";
import { FilmRow } from "./components/FilmRow";
import "./styles/FilmDetail.css";
import "./FilmLibrary.css";
import { useEffect, useState, useMemo } from "react";
import { YearCalendar } from "./components/YearCalendar";

function FilmLibrary() {
  const [selectedFilm, setSelectedFilm] = useState("");
  const [showFavorites, setShowFavorites] = useState([]);
  const [fetchedFilms, setFetchedFilms] = useState([]);
  const [updatedFilms, setUpdatedFilms] = useState([]);
  const [isFavoFilmCategorySelected, setIsFavoFilmCategorySelected] =
    useState(false);
  const [isFavoFilmsClicked, setIsFavoFilmsClicked] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedYear, setSelectedYear] = useState(2022);
  const [prevSelectedYear, setPrevSelectedYear] = useState(2022);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const BearerToken = process.env.REACT_APP_BearerToken;
  const options = useMemo(
    () => ({
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${BearerToken}`,
      },
    }),
    [BearerToken]
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

  const loadMoreFilms = () => {
    setPageNumber(pageNumber + 1);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isFavoFilmCategorySelected & isFavoFilmsClicked) {
      setUpdatedFilms(showFavorites);
    } else {
      // setUpdatedFilms(fetchedFilms);
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
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=${selectedYear}&sort_by=popularity.desc&page=${pageNumber}`,
          options
        );

        const data = await response.json();
        if (pageNumber === 1) {
          // If pageNumber is 1, replace the fetched films with new results
          setFetchedFilms(data.results);
        } else {
          // If pageNumber is greater than 1, append the new results to existing films
          setFetchedFilms((prevFilms) => [...prevFilms, ...data.results]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovies();
  }, [options, pageNumber]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=${selectedYear}&sort_by=popularity.desc&page=${pageNumber}`,
          options
        );
        const data = await response.json();
        setFetchedFilms(data.results);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovies();
  }, [options, selectedYear]);

  useEffect(() => {
    setUpdatedFilms(fetchedFilms);
  }, [fetchedFilms]);

  useEffect(() => {
    setPrevSelectedYear(prevSelectedYear);
  }, [prevSelectedYear]);

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
        <div className="load__more">
          <button className="button__extend" onClick={loadMoreFilms}>
            LOAD MORE
          </button>
          <button className="button__extend" onClick={handleModalOpen}>
            CHOOSE YEAR
          </button>
          {isModalOpen && (
            <YearCalendar
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              prevSelectedYear={prevSelectedYear}
              setPrevSelectedYear={setPrevSelectedYear}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              onClose={handleModalClose}
            />
          )}
        </div>
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
