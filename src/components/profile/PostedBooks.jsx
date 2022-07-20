import React, { useEffect, useState } from "react";
import { renderMatches, useNavigate } from "react-router-dom";
import axios from "../../api/api";
import getAccessToken from "../../jwt/jwtauth";
import Loader from "../loader/Loader";
import "./postedstyle.css";

const PostedBooks = ({ book }) => {
  const navigate = useNavigate();
  const [rerender, setrerender] = useState(false);
  const [loader, setloader] = useState(false);

  useEffect(() => {}, [rerender]);

  const deleteBook = async () => {
    try {
      setloader(true);
      let res = await axios.delete(`/delete/${book._id}`, {
        headers: {
          Authorization: getAccessToken(),
          img: book.image,
        },
      });
      console.log("delted book hehe!!");
      setrerender(!rerender);
      setloader(false);
    } catch (error) {
      console.log("error: " + error);
      setloader(false);
    }
  };

  const navigateToDetails = () => {
    navigate(`/details?q=${book._id}`);
  };
  const navigateToUpdate = () => {
    navigate(`/updatebook?q=${book._id}`, {
      state: { book: book },
    });
  };

  return (
    <>
      {loader && <Loader />}
    <div className="bookwraper">
      <div className="singlebook">
        <div className="imageholder">
          <img src={`https://serverbooksmart.herokuapp.com/${book.image}`} alt="" />
        </div>
        <div className="nameprice">
          <div className="booksname">{book.name}</div>
          <div className="price">Nrs. {book.price}</div>
        </div>
        <div className="editdelteholder">
          <div className="editholder" onClick={navigateToUpdate}>
            <img src="/edit.png" alt="" />
          </div>
          <div className="deleteholder" onClick={navigateToUpdate}>
            <img src="/delete.png" alt="" />
          </div>
        </div>
        <div className="negotiable">
          {book.negotiable ? <p>negotiable</p> : null}
        </div>
        <div className="sellerName">
          <p className="bold">sellerName: </p> <p>{book.seller}</p>
        </div>
        <div className="postedviewdetholder">
          <button className="viewdetbtn" onClick={() => navigateToDetails()}>
            View Details
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default PostedBooks;
