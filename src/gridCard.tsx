import { useState, useEffect } from 'react'
import {FaSearch} from "react-icons/fa";
import axios from 'axios'
import './card.css'
import ListItem from './listItem';
import Heading from './Heading';


// next steps: filter
function GridCard() {
  interface Artwork {
      id: number;
      title: string;
      image_id: string | null;
      date_start:number;
      date_end:number;
      date_display:string;
      artist_display:string;
      short_description:string;
  }

  interface ArtworkResponse {
      data: Artwork[];
      config: {
          iiif_url: string;
      };
  }

  const [data, setData] = useState<Artwork[]>([]);
  const [iiifUrl, setIiifUrl] = useState("");

  useEffect(() => {
      axios.get<ArtworkResponse>(
          "https://api.artic.edu/api/v1/artworks?limit=70"
      )
      .then(response => {
          setData(response.data.data);
          setIiifUrl(response.data.config.iiif_url);
      })
      .catch(error => {
          console.error(error);
      });
  }, []);

  const gridItems = []
  console.log(data.length);
  // if (data.length >= 10) {
    for (let i = 0; i < data.length; i++) {
        gridItems.push(
                <img src={
                    data[i].image_id
                        ? iiifUrl + "/" + data[i].image_id + "/full/843,/0/default.jpg"
                        : ""
                }/>
        );
      // }
    // }
  }
  return (
    <>
      <Heading/ >
      <div className='card-container'>
        <div className="card">
          <div className="card-header"></div>
          <div id="grid" className='card-body'>
            {gridItems}
          </div>
        </div>
      </div>
    </>
  )
}

export default GridCard;
