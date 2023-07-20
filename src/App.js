import { BrowserRouter, Route, Routes } from "react-router-dom";
import FilmLibrary from "./FilmLibrary";
import { HomePage } from "./components/HomePage";
import { NotFoundPage } from "./components/NotFoundPage";
import FilmDetail, { FilmDetailEmpty } from "./components/FilmDetail";
import { useState } from "react";

function App() {
  const [selectedFilm, setSelectedFilm] = useState("");

  // Callback function to receive selected film data from FilmLibrary
  const handleSelectedFilm = (film) => {
    setSelectedFilm(film);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/films"
          element={<FilmLibrary onSelectFilm={handleSelectedFilm} />}
        >
          <Route
            path=":filmID"
            element={
              <FilmDetail
                title={selectedFilm.original_title}
                posterURL={selectedFilm.poster_path}
                backDropURL={selectedFilm.backdrop_path}
                tagline={selectedFilm.tagline}
                overView={selectedFilm.overview}
              />
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
