// import { useState } from 'react'
import './Heading.css'

function Heading() {
  return (
    <>
      <div className="nav">
        <h1>Art Museum Planner</h1>
        <div className="toggles">
          <button className="galleryButton">Gallery View</button>
          <button className="listbutton">List View</button>
        </div>
      </div>
    </>
  )
}

export default Heading;
