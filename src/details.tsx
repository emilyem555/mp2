import { useState, useEffect } from 'react'
import {FaArrowCircleLeft, FaArrowCircleRight, FaTimes} from "react-icons/fa";
import {useNavigate, useLocation} from 'react-router-dom';

import axios from 'axios'
import './card.css'
import { useParams } from 'react-router-dom';


// next steps: make order navigation/next prev stuff.
function Details() {

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
      data: Artwork;
      config: {
          iiif_url: string;
      };
  }
  const {id} = useParams();
  var location = useLocation();
  const {d} = (location.state || {}) as { d?: Artwork[] };
  
  // const [dataList, setDataList] = useState<Artwork[]>([]);
  // const [idx, setIdx] = useState<number>(0);
  const [data, setData] = useState<Artwork>();
  const [iiifUrl, setIiifUrl] = useState("");

  let navigate = useNavigate();
  useEffect(() => {
        axios.get<ArtworkResponse>(
            "https://api.artic.edu/api/v1/artworks/"+String(id)
        )
        .then(response => {
            let val = response.data.data;
            setData(val);
            setIiifUrl(response.data.config.iiif_url);
        })
        .catch(error => {
            console.error(error);
        });
    }, [id]);
    const idx = d?.findIndex(item => item.id === Number(id)) ?? -1;
console.log("id:", id);
console.log("idx:", idx);
console.log("d:", d);
  return (
    <>
      <div className='card-container-details'>
        <div onClick={()=>(idx>=0?navigate(`/details/${(d? d[(idx-1+ d.length)%d.length].id:1)}`,{ replace: true,state:{d:d}}):console.log("noNavigate"))}>
          <FaArrowCircleLeft  id="left" />
        </div>
        <div id="details-card"className="card">
          <div id="details" className='card-body'>
            <div id="body-top">
              <div onClick={()=>navigate("/list", { replace: true })}>
                <FaTimes id="details-close"/>
              </div>
            </div>
            <div>
              <div>
                <h2>{data?.title}</h2>
                <h3>{data?.artist_display}</h3>
                <h4>{data?.date_display}</h4>
                <h5>{data?.short_description}</h5>
              </div>
              <img  src={
                      data?.image_id
                          ? iiifUrl + "/" + data.image_id + "/full/843,/0/default.jpg"
                          : undefined
                  }/>
            </div>
          </div>
        </div>
        <div onClick={()=>(d&&idx < d.length?navigate(`/details/${(d? d[(idx+1)%d.length].id:1)}`,{ replace: true,state:{d:d}}):console.log("noNavigate"))}>
          <FaArrowCircleRight  id="right" />
        </div>
      </div>
    </>
  )
}

export default Details;
