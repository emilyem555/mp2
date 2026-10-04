import {useNavigate} from 'react-router-dom';
import './card.css'

function ListItem({ title, artist="Not Listed", image,id }: { title: string,artist:string, image: string, id: number }) {
  let navigate = useNavigate();
  return (
    <div onClick={()=>navigate(`/details/${id}`, { replace: true })} id={title} className="itemGroup">
      <img className="listImg" src={image} referrerPolicy="no-referrer" />
      <div id="title-artist">
        <h2>{title}</h2>
        <h3>{artist}</h3>
      </div>
    </div>
  );
}

export default ListItem;
