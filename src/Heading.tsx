// import { useState } from 'react'
import { useNavigate, useLocation} from 'react-router-dom';
import {FaImages, FaBars} from "react-icons/fa";
import './Heading.css';

function Heading() {
  // const [pg, setPg] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="nav">
      <h1>Art Museum Planner</h1>

      <div className="toggles">
        <button
          onClick={() => {
            // setPg(1);
            navigate("/gallery", { replace: true });
          }}
          className={
            location.pathname === "/gallery"
              ? "galleryButton active"
              : "galleryButton"
          }
        >
          <FaImages /> Gallery View
        </button>

        <button
          onClick={() => {
            // setPg(0);
            navigate("/list", { replace: true });
          }}
          className={
            location.pathname === "/list"
              ? "listbutton active"
              : "listbutton"
          }
        >
          <FaBars /> List View
        </button>
      </div>
    </div>
  );
}


export default Heading;
