import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import PostedBooks from "./PostedBooks";
import axios from "../../api/api";
import getAccessToken from "../../jwt/jwtauth";
import "./postedstyle.css";
import { LoaderCircle } from "../loader/Loader";

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
      <div className="nameemailholder">
        <div className="name">Name: {userName}</div>
        <div className="email">Email: {userEmail}</div>
      </div>
      <h3>Books You Have Posted</h3>
      {loader && <LoaderCircle />}
      <div className="postedbookholder">
        {postedBooks.map((book) => {
          return <PostedBooks book={book} />;
        })}
      </div>
    </>
  );
};

export default Profile;
