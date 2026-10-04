import { useState, useEffect } from 'react'
import {FaArrowCircleLeft, FaArrowCircleRight, FaTimes} from "react-icons/fa";
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import './card.css'
import { useParams } from 'react-router-dom';


// next steps: make order navigation/next prev stuff.
function Details() {
  const {id} = useParams();
  interface Artwork {
      id: number;
      title: string;
      image_id: string | null;
      date_display:string;
      artist_display:string;
      short_description:string;
  }
  interface ArtworkResponse {
      data: Artwork;
      config: {
          iiif_url: string;
      };
  }
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
    }, []);

  return (
    <>
      <div className='card-container-details'>
        <FaArrowCircleLeft id="left" />
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
              <img src={
                      data?.image_id
                          ? iiifUrl + "/" + data.image_id + "/full/843,/0/default.jpg"
                          : ""
                  }/>
            </div>
          </div>
        </div>
        <FaArrowCircleRight id="right" />
      </div>
    </>
  )
}

export default Details;
