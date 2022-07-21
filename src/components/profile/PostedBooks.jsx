import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/api";
import getAccessToken from "../../jwt/jwtauth";
import "./postedstyle.css";
import { toast } from "react-toastify";

const PostedBooks = ({ book }) => {
  const navigate = useNavigate();
  const [rerender, setrerender] = useState(false);

  useEffect(() => {}, [rerender]);

  const deleteBook = async () => {
    try {
      await axios.delete(`/delete/${book._id}`, {
        headers: {
          Authorization: getAccessToken(),
          img: book.image,
        },
      });
      toast.success("Book Deleted !", {autoClose: 1000, toastId: "posted1"});
      setrerender(!rerender);
    } catch (error) {
      toast.error("Cannot delete book !", {autoClose: 1000, toastId: "posted2"})
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
          <div className="deleteholder" onClick={deleteBook}>
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
