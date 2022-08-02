import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataProvider";
import axios from "../../api/api";
import DisplaySearched from "../display/Display";
import getAccessToken from "../../jwt/jwtauth";
import {LoaderCircle} from "../loader/Loader";
import NotFound from "../notfound/NotFound";

const Searched = () => {
  const { searchedData } = useContext(DataContext);
  const [books, setBooks] = useState([]);
  const [loader, setloader] = useState(false);
  const [notfound, setnotfound] = useState(false);

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
        console.log(res.da)
        setloader(false);
      } catch (error) {
        console.log("error: " + error);
        setloader(false);
      }
      if(books.length < 1) setnotfound(true)
    };
    fetchBook();
  }, [searchedData]);

  return (
    <>
      {loader && <LoaderCircle />}
      {books?.length > 0 ? (
        <div className="resultholder">
          {books?.map((book) => {
            return (
              <>
                <DisplaySearched book={book} key={Math.random()}/>
              </>
            );
          })}
        </div>
      ) : 
        notfound ? (<NotFound towarn="No any result for your search.."/>) : null
      }
    </>
  );
};

export default Searched;
