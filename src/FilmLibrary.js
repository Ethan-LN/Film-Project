import FilmDetail from "./FilmDetail";

import './FilmLibrary.css'
import './FilmRow.css'


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
        <div className="FilmRow">
          <img src="https://image.tmdb.org/t/p/w780/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg" alt="{film title} film poster" />
          <div className="film-summary">
            <h3>TITLE</h3>
            <p>YEAR</p>
            <div className="actions">
              <button className="action">
                <span className="material-icons">add_to_queue</span>
              </button>
              <button className="action">
                <span className="material-icons">read_more</span>
              </button>
            </div>
          </div>
        </div>
        <div className="FilmRow">
          <img src="https://image.tmdb.org/t/p/w780/pKESfn2Pdy0b7drvZHQb7UzgqoY.jpg" alt="{film title} film poster" />
          <div className="film-summary">
            <h3>TITLE</h3>
            <p>YEAR</p>
            <div className="actions">
              <button className="action">
                <span className="material-icons">remove_from_queue</span>
              </button>
              <button className="action">
                <span className="material-icons">read_more</span>
              </button>
            </div>
          </div>
        </div>
        <div className="FilmRow">
          <img src="https://image.tmdb.org/t/p/w780/dN9LbVNNZFITwfaRjl4tmwGWkRg.jpg" alt="{film title} film poster" />
          <div className="film-summary">
            <h3>TITLE</h3>
            <p>YEAR</p>
            <div className="actions">
              <button className="action">
                <span className="material-icons">add_to_queue</span>
              </button>
              <button className="action">
                <span className="material-icons">read_more</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="film-details">
        <h1 className="section-title">DETAILS</h1>
        <FilmDetail/>
      </div>
    </div>
  );
}

export default FilmLibrary