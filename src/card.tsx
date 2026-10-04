import { useState, useEffect } from 'react'
import {FaSearch} from "react-icons/fa";
import axios from 'axios'
import './card.css'
import ListItem from './listItem';
import Heading from './Heading';

function ListCard() {
  interface Artwork {
      id: number;
      title: string;
      image_id: string | null;
      artist_display:string;
      date_start: number;
      date_end: number;
  }

  interface ArtworkResponse {
      data: Artwork[];
      config: {
          iiif_url: string;
      };
  }

  const [data, setData] = useState<Artwork[]>([]);
  const [sortedData, setSortedData] = useState<Artwork[]>([]);
  const [iiifUrl, setIiifUrl] = useState("");
  const [inputText, setSearch] = useState("");
  const [sort, setSort] = useState(0); // 0 - none, 1 - a-z, 2 - z-a, 3 - newest, 4 - oldest

  useEffect(() => {
        axios.get<ArtworkResponse>(
            "https://api.artic.edu/api/v1/artworks?limit=50"
        )
        .then(response => {
            let val = response.data.data;
            setData(val);
            setSortedData(val);
            setIiifUrl(response.data.config.iiif_url);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

  function handleChange(str:string) {
    setSearch(str);
    updateAPI({search:inputText,sort:sort});
  }

  function handleSortChange(val:number) {
    setSort(val);
    sortData(val);
  }

  function sortData(sortVal:number = sort) {
    const temp = data;
    if(sortVal == 2) {
      setSortedData(temp.toSorted((a,b) => a.title > b.title? -1:1));
    } else if (sortVal == 1) {
      setSortedData(temp.toSorted((a,b) => a.title > b.title? 1: -1));
    } else if (sortVal == 3) {
      setSortedData(temp.toSorted((a,b) => a.date_end > b.date_end? -1:1));
    } else if (sortVal == 4) {
      setSortedData(temp.toSorted((a,b) => a.date_end > b.date_end? 1:-1));
    } else {
      setSortedData(temp.toSorted((a,b) => a.id > b.id? 1: -1));
    }
  }

  function updateAPI({search, sort}: { search: string, sort:number}) {
    var query;
    if (search.length > 0) {
      query =  "https://api.artic.edu/api/v1/artworks/search?q=" + search + "&fields=id,title,image_id,artist_display&limit=100";
    } else {
      query = "https://api.artic.edu/api/v1/artworks?limit=100";
    }
      axios.get<ArtworkResponse>(
         query
      )
      .then(response => {
          let arr = response.data.data;
          setData(arr);
          sortData();
          setIiifUrl(response.data.config.iiif_url);
      })
      .catch(error => {
          console.error(error);
      });
  }

  let listItems = []
  // if (sortedData.length >= 10) {
    for (let i = 0; i < sortedData.length; i++) {
        listItems.push(
            <ListItem
                title={sortedData[i].title}
                image={
                    sortedData[i].image_id
                        ? iiifUrl + "/" + sortedData[i].image_id + "/full/843,/0/default.jpg"
                        : ""
                }
                artist={sortedData[i].artist_display}
                id={sortedData[i].id}
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
              <select onChange={(e)=>handleSortChange(Number(e.target.value))} className="sort">
                <option value="0">Sort Art</option>
                <option value="1">A to Z</option>
                <option value="2">Z to A</option>
                <option value="3">Newest</option>
                <option value="4">Oldest</option>
              </select>
            </div>
            <div className='search-group'>
              <FaSearch size={20} className='search-icon'/>
              <input type="text" onChange={(e) => handleChange(e.target.value)} className='search' placeholder='Search for art..'></input>
            </div>
          </div>
          <div className='card-body'>
            {listItems}
          </div>
        </div>
      </div>
    </>
  )
}

export default ListCard;
