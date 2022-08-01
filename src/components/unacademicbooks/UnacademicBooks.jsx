import React, { useEffect, useState } from "react";
import DisplaySearched from "../display/Display";
import axios from "../../api/api";
import getAccessToken from "../../jwt/jwtauth";
import {LoaderCircle} from "../loader/Loader";
import "./unacademicstyle.css";

const UnacademicBooks = () => {
  const [books, setBooks] = useState([]);
  const [loader, setloader] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      //getting value from url query
      setloader(true);
      let res = await axios.get(`/unacademicbooks`, {
        headers: {
          Authorization: getAccessToken(),
        },
      });
      setBooks(res.data);
      setloader(false);
    };
    fetchBook();
  }, []);

  return (
    <>
      {loader && <LoaderCircle />}
      <div className="resultholder">
        {books.map((book) => {
          return (
            <>
              <DisplaySearched book={book} key={Math.random()}/>
            </>
          );
        })}
      </div>
    </>
  );
};

export default UnacademicBooks;
