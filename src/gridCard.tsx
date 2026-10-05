import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './card.css'
import Heading from './Heading';
// import { BsFillHandIndexFill } from 'react-icons/bs';

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

// next steps: filter
// filter categories: is public domain, is on display, categories(10). 6 per row probs. just make little pill buttons.
// filtering: query[term][category_term] = filter1 || filter 2 | filter 3
function GridCard({d}:{d:Artwork[]}) {
  const [data, setData] = useState<Artwork[]>([]);
  const [iiifUrl, setIiifUrl] = useState("");
  useEffect(() => {
        axios.get<ArtworkResponse>(
            "https://api.artic.edu/api/v1/artworks?limit=70"
        )
        .then(response => {
            if(d && d.length > 0) {
              setData(d);
            } else {
              setData(response.data.data);
            }
            setIiifUrl(response.data.config.iiif_url);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);
  

  let navigate = useNavigate();

  let gridItems: React.JSX.Element[] = [];
  console.log(data.length);
  // if (data.length >= 10) {
    for (let i = 0; i < data.length; i++) {
        gridItems.push(
                <img onError={()=> gridItems = gridItems.filter(item => i == gridItems.indexOf(item) )} onClick={()=>navigate(`/details/${data[i].id}`, { replace: true,state:{d:data} })} src={
                    data[i].image_id
                        ? iiifUrl + "/" + data[i].image_id + "/full/843,/0/default.jpg"
                        : ""
                }/>
        );
      // }
    // }
  }

  const filterButtons = []
  filterButtons.push(<button id="pd"className='filterButton'>Public Domain</button>);
  filterButtons.push(<button id="onDis" className='filterButton'>On Display</button>);
  filterButtons.push(<button className='filterButton'>Arts of Africa</button>);
  filterButtons.push(<button className='filterButton'>Painting and Sculpture of Europe</button>);
  filterButtons.push(<button className='filterButton' >Impressionism and Post-Impressionism</button>);
  filterButtons.push(<button className='filterButton'>Modern Painting and Sculpture</button>);
  filterButtons.push(<button className='filterButton'>Japanese</button>);
  filterButtons.push(<button className='filterButton'>Chinese</button>);
  filterButtons.push(<button className='filterButton'>South Asian</button>);
  filterButtons.push(<button className='filterButton'>Southeast Asian</button>);
  filterButtons.push(<button className='filterButton'>Islamic</button>);
  filterButtons.push(<button className='filterButton'>Himalayan</button>);
  
  return (
    <>
      <Heading/ >
      <div className='card-container'>
        <div className="card">
          <div id="grid-heading" className="card-header">{filterButtons}</div>
          <div id="grid" className='card-body'>
            {gridItems}
          </div>
        </div>
      </div>
    </>
  )
}

export default GridCard;
