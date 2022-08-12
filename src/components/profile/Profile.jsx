import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import axios from "../../api/api";
import getAccessToken from "../../jwt/jwtauth";
import "./postedstyle.css";
import { LoaderCircle } from "../loader/Loader";
import DisplaySearched from "../display/Display";

const Profile = () => {
  const { userName, userEmail } = useContext(DataContext);
  const [postedBooks, setpostedBooks] = useState([]);
  const [loader, setloader] = useState(false);

  useEffect(() => {
    const fetchPostedBooks = async () => {
      setloader(true);
      let search = window.location.search;
      let params = new URLSearchParams(search);
      let tosearch = params.get("q");
      let result = await axios.get(`/soldbooks/${tosearch}`, {
        headers: {
          Authorization: getAccessToken(),
        },
      });
      setpostedBooks(result.data);
      setloader(false);
    };
    fetchPostedBooks();
  }, []);

  return (
    <>
      {loader ? (
        <LoaderCircle />
      ) : (
        <>
          <div className="profilecontainer">
            <div className="nameemailholder">
              <div className="name">Name: {userName}</div>
              <div className="email">Email: {userEmail}</div>
            </div>
            <h3 style={{ textAlign: "center" }}>Books You Have Posted</h3>
            <div className="postedbookholder">
              {postedBooks?.length > 0 ? (
                postedBooks.map((book) => (
                  <DisplaySearched
                    book={book}
                    key={Math.random()}
                    profile={true}
                  />
                ))
              ) : (
                <DisplaySearched
                  book={false}
                  message={"You have not posted any book yet"}
                  key={Math.random()}
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
