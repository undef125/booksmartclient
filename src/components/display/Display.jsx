import React, { useState      } from "react";
import { useNavigate } from "react-router-dom";
import "./displaystyle.css";
import getAccessToken from "../../jwt/jwtauth";
import { toast } from "react-toastify";
import axios from "../../api/api";
import NotFound from "../notfound/NotFound";

const DisplaySearched = ({ book, profile }) => {
  const [notfound, setnotfound] = useState(false);
  if(book) setnotfound(false);

  const navigate = useNavigate();

  const navigateToDetails = () => {
    navigate(`/details?q=${book._id}`);
  };

  const navigateToUpdate = () => {
    navigate(`/updatebook?q=${book._id}`, {
      state: { book: book },
    });
  };
  const deleteBook = async () => {
    try {
      await axios.delete(`/delete/${book._id}`, {
        headers: {
          Authorization: getAccessToken(),
          img: book.image,
        },
      });
      toast.success("Book Deleted !", { autoClose: 1000, toastId: "posted1"});
    } catch (error) {
      toast.error("Cannot delete book !", {
        autoClose: 1000,
        toastId: "posted2",
      });
    }
  };

  return (
    <>
    {notfound ? (
      <NotFound towarn="Sorry no books in this section yet..." />
      ) : (<div className="singlebook">
      <div className="bookwraper">
      <div className="imageholder" onClick={navigateToDetails}>
        <img
          src={`https://serverbooksmart.herokuapp.com/${book.image}`}
          alt=""
        />
      </div>
      <div className="nameprice">
        <div className="booksname">
          {book.name.length > 16 ? `${book.name.slice(0, 13)}...` : book.name}
        </div>
        <div className="price">Nrs. {book.price}</div>
      </div>
      {profile && (
        <div className="editdelteholder">
          <div className="editholder" onClick={navigateToUpdate}>
            <img src="/edit.png" alt="" />
          </div>
          <div className="deleteholder" onClick={deleteBook}>
            <img src="/delete.png" alt="" />
          </div>
        </div>
      )}
      {book.free ? (
        <div className="negotiable">
          <div>
            <p>Free</p>
          </div>
        </div>
      ) : (
        <div className="negotiable">
          <div>
            <p>Negotiable: </p>
          </div>
          <div>{book.negotiable ? <p>Yes</p> : <p>No</p>}</div>
        </div>
      )}
      {!profile && (
        <div className="seller">
          <p>Seller: </p>
          <p>{book.seller}</p>
        </div>
      )}
    </div>
    </div>
  )}
  </>
  );
};

export default DisplaySearched;
