import { BrowserRouter, Route, Routes } from "react-router-dom";
import FilmLibrary from "./FilmLibrary";
import { HomePage } from "./components/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/films" element={<FilmLibrary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
