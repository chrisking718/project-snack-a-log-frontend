// Dependencies
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import heartSolid from "../assets/heart-solid.png";
import heartOutline from "../assets/heart-regular.png";
import SnackEditForm from "./SnackEditForm";
import * as tailwind from "../css/styles";

// API url for http requests
const API = process.env.REACT_APP_API_URL;

function SnackDetails() {
// Defining variables
  const { id } = useParams();
  const [snack, setSnack] = useState({});
  let navigate = useNavigate();

// useEffet runs when a different snack ID is requested or the snack object changes after edit
  useEffect(() => {
    axios
      .get(`${API}/snacks/${id}`)
      .then((res) => {
        setSnack(res.data);
      })
      .catch((c) => {
        console.warn("catch", c);
      });
  }, [id, snack]);
  
// if statement to determine if snack is healthy or unhealthy
  if ((Number(snack.fiber) < 5 && Number(snack.protein) < 5) || snack.added_sugar > 5 ){
    snack.is_healthy = false
  } else {
    snack.is_healthy = true
  }

// Delete request
  const handleDelete = () => {
    axios
    .delete(`${API}/snacks/${id}`)
    .then(() => navigate(`/snacks`))
    .catch((c) => console.warn("catch", c));
  };

  return (
    <div className={tailwind.details_page}>
        <div className="details-wrapper flex">
            <img 
              src={snack.image} 
              alt={`${snack.name} image`} 
              className={tailwind.details_img} 
            />
            <section className="info">
                <div className={tailwind.details_head}>
                    <h3 className={tailwind.details_h3}>{snack.name}</h3>
                    { snack.is_healthy ? (
                        <img src={heartSolid}  className={tailwind.heart}/>
                      ) : (
                        <img src={heartOutline}  className={tailwind.heart}/> 
                      )}
                </div>
                <div className="float-none">
                    <p className={`${tailwind.info} pt-10`}>
                      <span className="font-bold">Fiber:</span> {snack.fiber} g
                    </p>
                    <p className={tailwind.info}>
                      <span className="font-bold" >Protein:</span> {snack.protein} g
                    </p>
                    <p className={tailwind.info}>
                      <span className="font-bold">Added Sugar:</span> {snack.added_sugar} g
                    </p>
                </div>
                <div className="buttons mt-8">
                    <Link to="/snacks">
                        <button className={tailwind.button}>Back</button>
                    </Link>
                    <button className={tailwind.button} onClick={handleDelete}>
                      Delete
                    </button>
                    <SnackEditForm />
                </div>
            </section>
        </div>
    </div>
  );
}

export default SnackDetails;
