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
      is_public_domain:boolean;
      is_on_view:boolean;
      category_titles:Array<string>;
  }

  interface ArtworkResponse {
      data: Artwork[];
      config: {
          iiif_url: string;
      };
  }

  interface category {
    id:string;
    title:string;
  }

  interface categoryResponse {
      data: category[];
  }

// next steps: filter
// filter categories: is public domain, is on display, categories(10). 6 per row probs. just make little pill buttons.
// filtering: query[term][category_term] = filter1 || filter 2 | filter 3
function GridCard({d}:{d:Artwork[]}) {
  const [ogData, setOgData] = useState<Artwork[]>([]);
  const [data, setData] = useState<Artwork[]>([]);
  const [iiifUrl, setIiifUrl] = useState("");
  const [filters] = useState(new Set<string>());
  const [categories, setCategories] = useState<category[]>([]);
  useEffect(() => {
        axios.get<ArtworkResponse>(
            "https://api.artic.edu/api/v1/artworks?limit=100"
        )
        .then(response => {
            if(d && d.length > 0) {
              setOgData(d);
              setData(d);
            } else {
              setOgData(response.data.data);
              setData(response.data.data);
            }
            setIiifUrl(response.data.config.iiif_url);
        })
        .catch(error => {
            console.error(error);
        });

        axios.get<categoryResponse>(
          "https://api.artic.edu/api/v1/category-terms/search?query[term][subtype]=department&limit=35"
        )
        .then( response =>
          {setCategories(response.data.data);}
        ).catch(error => {
            console.error(error);
        });
    }, []);
  
  // if the text is in the set, remove it.
  // else, add it to the set.
  // filter the data array and reset the state.
  function filter(filterText:string) {
    if(filters.has(filterText)) {
      filters.delete(filterText);
      let temp = ogData;
      for(let f of filters) {
        if(f == "is_public_domain") {
          temp = temp.filter(val => val.is_public_domain);
        } else if (f == "is_on_view") {
          temp = temp.filter(val => val.is_on_view);
        } else {
          // console.log(f);
          temp = temp.filter(val => val.category_titles.includes(f));
        }
      }
      setData(temp);
    } else {
      filters.add(filterText);
      if(filterText == "is_public_domain") {
        setData(data.filter(val => val.is_public_domain));
      } else if (filterText == "is_on_view") {
        setData(data.filter(val => val.is_on_view));
      } else {
        setData(data.filter(val => val.category_titles.includes(filterText)));
      }
    }
    // console.log(filters);
  }

  let navigate = useNavigate();

  let gridItems: React.JSX.Element[] = [];
  // if (data.length >= 10) {
    for (let i = 0; i < data.length; i++) {
        gridItems.push(
                <img onError={()=> gridItems = gridItems.filter(item => i == gridItems.indexOf(item) )} onClick={()=>navigate(`/details/${data[i].id}`, { replace: true,state:{d:data} })} src={
                    data[i].image_id
                        ? iiifUrl + "/" + data[i].image_id + "/full/843,/0/default.jpg"
                        : ""
                }/>
        );
        // console.log(data[i].category_titles);
      // }
    // }
  }

  const filterButtons = []
  filterButtons.push(<button onClick={()=>filter("is_public_domain")} id="pd" className={filters.has("is_public_domain")?'filterButton active':'filterButton'}>Public Domain</button>);
  filterButtons.push(<button onClick={()=>{filter("is_on_view"); }} id="onDis" className={filters.has("is_on_view")?'filterButton active':'filterButton'}>On Display</button>);
  for(const c of categories) {
    filterButtons.push(<button onClick={()=>filter(c.title)} className={filters.has(c.title)?'filterButton active':'filterButton'}>{c.title}</button>);
  }
  // filterButtons.push(<button onClick={()=>filter("Painting and Sculpture of Europe")} className='filterButton'>Painting and Sculpture of Europe</button>);
  // filterButtons.push(<button onClick={()=>filter("Impressionism and Post-Impressionism")} className='filterButton' >Impressionism and Post-Impressionism</button>);
  // filterButtons.push(<button onClick={()=>filter("Modern Painting and Sculpture")} className='filterButton'>Modern Painting and Sculpture</button>);
  // filterButtons.push(<button onClick={()=>filter("Japanese")} className='filterButton'>Japanese</button>);
  // filterButtons.push(<button onClick={()=>filter("Chinese")} className='filterButton'>Chinese</button>);
  // filterButtons.push(<button onClick={()=>filter("South Asian")} className='filterButton'>South Asian</button>);
  // filterButtons.push(<button onClick={()=>filter("Southeast Asian")} className='filterButton'>Southeast Asian</button>);
  // filterButtons.push(<button onClick={()=>filter("Islamic")} className='filterButton'>Islamic</button>);
  // filterButtons.push(<button onClick={()=>filter("Himalayan")} className='filterButton'>Himalayan</button>);
  
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
