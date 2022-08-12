import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataProvider";
import axios from "../../api/api";
import DisplaySearched from "../display/Display";
import getAccessToken from "../../jwt/jwtauth";
import {LoaderCircle} from "../loader/Loader";

const Searched = () => {
  const { searchedData } = useContext(DataContext);
  const [books, setBooks] = useState([]);
  const [loader, setloader] = useState(false);

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
        setloader(false);
      }
    };
    fetchBook();
  }, [searchedData]);

  return (
    <>
      {loader ? <LoaderCircle /> : (
          <div className="postedbookholder">
          {
          books?.length > 0 ? 
           (books.map((book) =>  <DisplaySearched book={book} key={Math.random()} profile={true}/>))
           :
           (<DisplaySearched book={false} key={Math.random()} />)
           }
        </div>
        )
      }
    </>
  );
};

export default Searched;
