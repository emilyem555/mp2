import { useState, useEffect } from 'react'
import {FaSearch} from "react-icons/fa";
import axios from 'axios'
import './card.css'
import ListItem from './listItem';
import Heading from './Heading';


// next steps: images working, make search/sort functional
function ListCard() {
  interface Artwork {
      id: number;
      title: string;
      image_id: string | null;
      artist_display:string;
  }

  interface ArtworkResponse {
      data: Artwork[];
      config: {
          iiif_url: string;
      };
  }

  const [data, setData] = useState<Artwork[]>([]);
  const [iiifUrl, setIiifUrl] = useState("");
  const [inputText, setSearch] = useState("");

  useEffect(() => {
        axios.get<ArtworkResponse>(
            "https://api.artic.edu/api/v1/artworks"
        )
        .then(response => {
            setData(response.data.data);
            setIiifUrl(response.data.config.iiif_url);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

  function handleChange(str:string) {
    setSearch(str);
    updateAPI(str);
  }

  function updateAPI(search: string) {
    if (search.length > 0) {
      axios.get<ArtworkResponse>(
          "https://api.artic.edu/api/v1/artworks/search?q=" + search
      )
      .then(response => {
          setData(response.data.data);
          setIiifUrl(response.data.config.iiif_url);
      })
      .catch(error => {
          console.error(error);
      });
    } else {
      axios.get<ArtworkResponse>(
          "https://api.artic.edu/api/v1/artworks"
      )
      .then(response => {
          setData(response.data.data);
          setIiifUrl(response.data.config.iiif_url);
      })
      .catch(error => {
          console.error(error);
      });
    }
  }

  const listItems = []
  // if (data.length >= 10) {
    for (let i = 0; i < data.length; i++) {
        listItems.push(
            <ListItem
                title={data[i].title}
                image={"https://www.artic.edu/iiif/2/"+data[i].image_id+"/full/843,/0/default.png"}
                artist={data[i].artist_display}
            />
        );
    }
  // }
  return (
    <>
      <Heading/ >
      <div className='card-container'>
        <div className="card">
          <div className="card-header">
            <div className="sort-group">
              <label>Sort By:  </label>
              <select className="sort">
                <option>Hello</option>
              </select>
            </div>
            <div className='search-group'>
              <FaSearch size={20} className='search-icon'/>
              <input type="text" onChange={(e) => handleChange(e.target.value)} className='search' placeholder='Search for art..'></input>
            </div>
          </div>
          <div className='card-body'>
            {/* <img 
              src="https://www.artic.edu/iiif/2/2d484387-2509-5e8e-2c43-22f9981972eb/full/843,/0/default.png" 
              alt="Sample Image" 
              referrerPolicy="no-referrer"
            />
            <img src="https://www.artic.edu/iiif/2/2d484387-2509-5e8e-2c43-22f9981972eb/full/843,/0/default.png" /> */}
            {listItems}
          </div>
        </div>
      </div>
    </>
  )
}

export default ListCard;
