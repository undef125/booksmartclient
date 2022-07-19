import React from "react";
import { useNavigate } from "react-router-dom";
import "./displaystyle.css";

const DisplaySearched = ({ book }) => {
  const navigate = useNavigate();

  const navigateToDetails = () => {
    navigate(`/details?q=${book._id}`);
  };

  return (
    <div className="bookwraper">
      <div className="singlebook">
        <div className="imageholder">
          <img src={`https://serverbooksmart.herokuapp.com/${book.image}`} alt="" />
        </div>
        <div className="nameprice">
          <div className="booksname">{book.name}</div>
          <div className="price">Nrs. {book.price}</div>
        </div>
        <div className="negotiable">
          <p>Negotiable: </p>
          {book.negotiable ? <p>Yes</p> : <p>No</p>}
        </div>
        <div className="seller">
          <p>Seller: </p>
          <p>{book.seller}</p>
        </div>
        <div className="viewdetholder">
          <button className="viewdetbtn" onClick={() => navigateToDetails()}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplaySearched;
