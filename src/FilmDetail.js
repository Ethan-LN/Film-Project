import './FilmDetail.css'

function FilmDetail(props) {
  return (
    <div className="FilmDetail is-hydrated">
      <figure className="film-backdrop">
        <img src={'https://image.tmdb.org/t/p/w1280/goCvLSUFz0p7k8R10Hv4CVh3EQv.jpg'} alt="Baby Driver" />
        <h1 className="film-title">{'Baby Driver'}</h1>
      </figure>

      <div className="film-meta">
        <h2 className="film-tagline">{'Tagline'}</h2>
        <p className="film-detail-overview">
          <img src={'https://image.tmdb.org/t/p/w780/dN9LbVNNZFITwfaRjl4tmwGWkRg.jpg'} className="film-detail-poster" alt={''} />
          {'Overview goes here'}
        </p>
      </div>
    </div>
  )
}

function FilmDetailEmpty() {
  return (
    <div className="FilmDetail">
    <p>
      <i className="material-icons">subscriptions</i>
      <span>No film selected</span>
    </p>

  </div>
  )
}

export default FilmDetail