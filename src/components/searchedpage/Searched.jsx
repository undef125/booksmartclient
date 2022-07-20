import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataProvider";
import axios from "../../api/api";
import DisplaySearched from "../display/Display";
import "./searchstyle.css";
import getAccessToken from "../../jwt/jwtauth";
import Loader from "../loader/Loader";

const Searched = () => {
  const { searchedData } = useContext(DataContext);
  const [books, setBooks] = useState([]);
  const [loader, setloader] = useState(false);
  const [found, setfound] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      //getting value from url query
      try {
        setloader(true);
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let tosearch = params.get("q");
        let res = await axios.get(`/getbooks/${tosearch}`, {
          headers: {
            Authorization: getAccessToken(),
          },
        });
        setBooks(res.data);
        setloader(false);
      } catch (error) {
        console.log("error: " + error);
        setloader(false);
      }
    };
    fetchBook();
  }, [searchedData]);

  return (
    <>
      {loader && <Loader />}
      {books.length > 0 ? (
        <div className="searchdisplaycontainer">
          {books.map((book) => {
            return <DisplaySearched book={book} />;
          })}
        </div>
      ) : (
        <>{found && <h2>NOTHING FOUND!</h2>} //no result found</>
      )}
    </>
  );
};

export default Searched;
