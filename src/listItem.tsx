import { useState, useEffect } from 'react'
import axios from 'axios'
import './card.css'

function ListItem({ title, artist="Not Listed", image }: { title: string,artist:string, image: string }) {
  return (
    <div id={title} className="itemGroup">
      <img className="listImg" src={image} referrerPolicy="no-referrer" />
      <div id="title-artist">
        <h2>{title}</h2>
        <h3>{artist}</h3>
      </div>
    </div>
  );
}

export default ListItem;
