import { useEffect, useState, useContext } from "react";
import axios from "../../api/api";
import getAccessToken from "../../jwt/jwtauth";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { toast } from "react-toastify";
import "./detailstyle.css";

const Details = () => {
  const { userId } = useContext(DataContext);
  const navigate = useNavigate();

  const [book, setBook] = useState({});
  const [samePerson, setsamePerson] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let tosearch = params.get("q");
        let res = await axios.get(`/getbook/${tosearch}`, {
          headers: {
            Authorization: getAccessToken(),
          },
        });
        setBook(res.data);
        res.data[0]?.sellerid === userId
          ? setsamePerson(true)
          : setsamePerson(false);
        // console.log(book);
        console.log(
          "userid: " + userId + " current user: " + res.data[0].sellerid
        );
        console.log(userId === res.data[0].sellerid);
      } catch (error) {
        console.log("error: " + error);
      }
    };
    fetchBook();
  }, []);
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
      toast.success("Book Deleted !", {autoClose: 1000, toastId: "posted1"});
    } catch (error) {
      toast.error("Cannot delete book !", {autoClose: 1000, toastId: "posted2"})
    }
  };

  const chatWithSeller = async () => {
    //creating chat

    // console.log(userId, book[0].sellerid);

    try {
      await axios.post(`/chat`, {
        senderId: userId,
        receiverId: book[0].sellerid,
      });
    } catch (error) {
      console.log(error);
    }

    navigate("/chat", {
      state: { sellerId: book[0].sellerid, buyerId: userId },
    });
  };

  return (
    <>
      {book.length > 0 ? (
        <div className="viewdetaildet">
          <div className="leftdetailsectiondet">
            <div className="imageHolderdet">
              <img
                src={`https://serverbooksmart.herokuapp.com/${book[0].image}`}
                alt=""
              />
            </div>
          </div>
          <div className="rightdetailsectiondet">
            <div className="pricename">
              <div className="namedet">
                <p className="headings"></p> <p>{book[0].name}</p>
              </div>
              <div className="pricedet">
                <p className="headings"></p>
                <p> Nrs.{book[0].price}</p>
              </div>
            </div>
            <div className="negotiabledet">
              <p className="headings">Negotiable Status: </p>{" "}
              {book[0].negotiable ? <p>Negotiable</p> : <p>Not Negotiable</p>}
            </div>
            <div className="sellerNamedet">
              <p className="headings">Seller: </p>
              <p>{book[0].seller}</p>
            </div>
            <div className="detaildet">
              <div>
                <p className="headings">Description</p>
              </div>
              <div>
                <p>{book[0].description}</p>
              </div>
            </div>
            <div className="chatwithsellerdet">
              {samePerson ? (
                <div className="editdelteholderelse">
                  <div className="editholder" onClick={navigateToUpdate}>
                    <img src="/edit.png" alt="" />
                  </div>
                  <div className="deleteholder" onClick={deleteBook}>
                    <img src="/delete.png" alt="" />
                  </div>
                </div>
              ) : (
                // <Link to={"/chat"} state={{ sellerId: book[0].sellerid , buyerId: userId}}>
                // </Link>
                <button className="buttonchat" onClick={() => chatWithSeller()}>
                  Chat with seller
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Details;
