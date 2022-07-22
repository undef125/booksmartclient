import React, { useEffect, useState } from "react";
import DisplaySearched from "../display/Display";
import axios from "../../api/api";
import getAccessToken from "../../jwt/jwtauth";
import { LoaderCircle } from "../loader/Loader";
import NotFound from "../notfound/NotFound";

const FreeBooks = () => {
  const [books, setBooks] = useState([]);
  const [loader, setloader] = useState(false);
  const [notfound, setnotfound] = useState(false);

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
      if(books.length < 1) setnotfound(true);
    };
    fetchBook();
  }, []);
  return (
    <>
    { loader && <LoaderCircle /> }
    { notfound && <NotFound towarn="Sorry no books in this section yet..."/> }
      <div>
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
