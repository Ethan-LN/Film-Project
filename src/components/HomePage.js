import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/HomePage.css"


export const HomePage = () => {
  return (
    <div className="HomePage">
    <h1>Welcome to Film Library</h1>
    <p>
      This is the homepage of the Film Library app. You can browse through a
      list of films and view their details here.
    </p>
    <p>
      Click the button below to explore the films collection:
    </p>
    <Link to="/films">
      <button>Explore Films</button>
    </Link>
  </div>
);
};
  
