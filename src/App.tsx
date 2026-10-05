import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './App.css'
import axios from 'axios';
// import Heading from './Heading.tsx'
import ListCard from './card.tsx'
import GridCard from './gridCard.tsx';
import Details from './details.tsx';

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

// call api here, pass it to each component?
// make list the starting point?
function App() {
  const [data, setData] = useState<Artwork[]>([]);
  // let navigate = useNavigate();
    useEffect(() => {
        axios.get<ArtworkResponse>(
            "https://api.artic.edu/api/v1/artworks?limit=70"
        )
        .then(response => {
            setData(response.data.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);
  // navigate("/list");
    // pass data to all below
  return (
    <>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      {/* <Card /> */}
      <Routes>
        <Route path="/" element={<Navigate to="/list" replace />} />
        <Route path="/list" element={<ListCard d={data}/>} />
        <Route path="/gallery" element={<GridCard d={data}/>}/>
        <Route path="/details/:id" element={<Details />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
