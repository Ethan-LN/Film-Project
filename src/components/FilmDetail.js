import "../styles/FilmDetail.css";

function FilmDetail(props) {
  return (
    <div className="FilmDetail is-hydrated">
      <figure className="film-backdrop">
        <img
          src={`https://image.tmdb.org/t/p/w1280/${props.backDropURL}`}
          alt="Baby Driver backdrop"
        />
        <h1 className="film-title">{props.title}</h1>
      </figure>

      <div className="film-meta">
        <p className="film-detail-overview">
          <img
            src={`https://image.tmdb.org/t/p/w780/${props.posterURL}`}
            className="film-detail-poster"
            alt={"Baby driver poster"}
          />
          {props.overView}
        </p>
      </div>
    </div>
  );
}

function FilmDetailEmpty() {
  return (
    <div className="FilmDetail">
      <p>
        <i className="material-icons">subscriptions</i>
        <span>No film selected</span>
      </p>
    </div>
  );
}

export default FilmDetail;
export { FilmDetailEmpty };
