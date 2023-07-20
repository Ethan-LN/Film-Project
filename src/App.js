import { BrowserRouter, Route, Routes } from "react-router-dom";
import FilmLibrary from "./FilmLibrary";
import { HomePage } from "./components/HomePage";
import { NotFoundPage } from "./components/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/films/*" element={<FilmLibrary />} />
        <Route path="/*" element={<NotFoundPage/>}  />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
