import React, { useEffect, useState } from "react";
import DisplaySearched from "../display/Display";
import axios from "../../api/api";
import getAccessToken from "../../jwt/jwtauth";
import { LoaderCircle } from "../loader/Loader";

const FreeBooks = () => {
  const [books, setBooks] = useState([]);
  const [loader, setloader] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      //getting value from url query
      setloader(true);
      let res = await axios.get(`/getfreebooks`, {
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
                <DisplaySearched book={book} />
              </>
            );
          })}
        </div>
    </>
  );
};

export default FreeBooks;
