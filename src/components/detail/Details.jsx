import { useEffect, useState, useContext } from "react";
import axios from "../../api/api";
import getAccessToken from "../../jwt/jwtauth";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import "./detailstyle.css";
const Details = (props) => {
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
        book[0]?.sellerid === userId
          ? setsamePerson(true)
          : setsamePerson(false);
      } catch (error) {
        console.log("error: " + error);
      }
    };
    fetchBook();
  }, []);

  const chatWithSeller = async () => {
    //creating chat

    console.log(userId, book[0].sellerid);

    try {
      const result = await axios.post(`/chat`, {
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
              <img src={`http://localhost:5000/${book[0].image}`} alt="" />
            </div>
          </div>
          <div className="rightdetailsectiondet">
            <div className="namedet"><p className="bold">Bookname: </p> <p>{book[0].name}</p></div>
            <div className="pricedet"><p className="bold">Bookprice: </p><p> Nrs.{book[0].price}</p></div>
            <div className="negotiabledet"><p className="bold">Negotiable: </p> {book[0].negotiable ? <p>Yes</p> : <p>No</p>}</div>
            <div className="sellerNamedet"><p className="bold">sellerName: </p> <p>{book[0].seller}</p></div>
            <div className="detaildet"><p className="bold">Description: </p> <p>{book[0].description}</p></div>
            <div className="chatwithsellerdet">
              {!samePerson && (
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
