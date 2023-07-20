import React from 'react'
import { Link } from 'react-router-dom'


export const HomePage = () => {
  return (
    <div>
    <h1>Welcome to the Home Page!</h1>
    <Link to="/films">Go to Films</Link>
  </div>
  )
}
