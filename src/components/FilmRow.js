import React from 'react'
import './FilmRow.css'

export const FilmRow = props => {

  return (
    <div className="FilmRow">
          <img src= {`https://image.tmdb.org/t/p/w780/${props.posterURL}`} alt={`${props.title} film poster`} />
          <div className="film-summary">
            <h3>{props.title}</h3>
            <p>{props.releaseDate}</p>
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
  )
}
