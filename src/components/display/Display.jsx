import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./displaystyle.css";
import getAccessToken from "../../jwt/jwtauth";
import { toast } from "react-toastify";
import axios from "../../api/api";
import NotFound from "../notfound/NotFound";

const DisplaySearched = ({ book, profile, message }) => {

  const navigate = useNavigate();
  const [displaydelpop, setdisplaydelpop] = useState(false);

  const navigateToDetails = () => {
    navigate(`/details?q=${book._id}`);
  };

  const navigateToUpdate = () => {
    navigate(`/updatebook?q=${book._id}`, {
      state: { book: book },
    });
  };
  const deleteBook = async () => {
    const id = toast.loading("deleting in process!");
    try {
      await axios.delete(`/delete/${book._id}`, {
        headers: {
          Authorization: getAccessToken(),
          img: book.image,
        },
      });
    toast.update(id, {render: "Book Deleted !", type: "success", isLoading:false, autoClose: 1000, toastId: "deleted"});
  } catch (error) {
      toast.update(id, {render: "Cannot delete book !", type: "error", isLoading:false, autoClose: 1000, toastId: "deleted"});
    }
  };

  useEffect(() => {
   
  }, [displaydelpop])
  


  return (
    <>
        {displaydelpop && 
        <>
        <div className="backdropmaker">
          <div className="popmodelholder">
            <div className="textremindingsection">
              Are you sure you want to delete this book?
            </div>
            <div className="buttonsection">
              <div className="cancel">
                <button className="canceldeletionbtn" onClick={() => setdisplaydelpop(false)}>Cancel</button>
              </div>
              <div className="delete">
                <button className="confirmdelbtn" onClick={ () => {
                  setdisplaydelpop(false);
                  deleteBook();
                }}>Delete</button>
              </div>
            </div>
          </div>
          </div>
        </>}
      {!book ? (
        <NotFound towarn={message || "Sorry no books in this section yet..."} />
        ) : (
          <>
          <div className="bookwraper">
            <div className="singlebook">
              <div className="imageholder" onClick={navigateToDetails}>
                <img
                  src={`https://booksmart-97gk.onrender.com/${book.image}`}
                  // src={`https://serverbooksmart.herokuapp.com/${book.image}`}
                  alt=""
                />
              </div>
              <div className="nameprice">
                <div className="booksname">
                  {book.name.length > 16
                    ? `${book.name.slice(0, 13)}...`
                    : book.name}
                </div>
                <div className="price">Nrs. {book.price}</div>
              </div>
              {profile && (
                <div className="editdelteholder">
                  <div className="editholder" onClick={navigateToUpdate}>
                    <img src="/edit.png" alt="" />
                  </div>
                  <div className="deleteholder" onClick={() => {
                    setdisplaydelpop(true);
                  }}>
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
        </>
      )}
    </>
  );
};

export default DisplaySearched;
