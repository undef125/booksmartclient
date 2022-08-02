import React, { useContext, useState } from "react";
import { DataContext } from "../../../context/DataProvider";
import "./navstyle.css";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { setsearchedData, userName } = useContext(DataContext);
  const [shownav, setshownav] = useState(false);

  const searchh = (value) => {
    setsearchedData(value);
    navigate(`/search?q=${value}`);
  };

  const navigateToProfile = () => {
    if (shownav) setshownav(false);
    navigate(`/profile?q=${userName}`);
  };
  const logoutUser = () => {
    // let refToken = sessionStorage.getItem("refreshToken");
    // await axios.get("/delreftoken",{token: refToken});
    sessionStorage.clear("accessToken");
    sessionStorage.clear("refreshToken");
    toast.warning("Logout Successfull!", {
      autoClose: 1000,
      toastId: "logout",
    });
    navigate("/login");
  };

  return (
    <div className="totalnavcontainer">
      <div className="navbarholder">
        <div className="innernav">
          <div className="leftone" onClick={() => navigate("/")}>
            <img src="/finallogo50.png" alt="" />
          </div>
          <div className="rightone">
            <div className="noham" id={shownav ? "smallscreen" : ""}>
              <div
                className="crossbtn nav-item"
                id={shownav ? "showcross" : ""}
                onClick={() => setshownav(false)}
              >
                <img src="/close.png" alt="" />
              </div>
              <Link
                to="/sellbook"
                className="nav-item"
                onClick={() => {
                  if (shownav) setshownav(false);
                }}
              >
                <div>Sell Book</div>
              </Link>
              <Link
                to="/freebooks"
                className="nav-item"
                onClick={() => {
                  if (shownav) setshownav(false);
                }}
              >
                <div>Free Books</div>
              </Link>
              <Link
                to="/unacademicbooks"
                className="nav-item"
                onClick={() => {
                  if (shownav) setshownav(false);
                }}
              >
                <div>Unacademic Books</div>
              </Link>
              <div className="nav-item" onClick={navigateToProfile}>
                Profile
              </div>
              <div className="nav-item" onClick={logoutUser}>
                Log Out
              </div>
            </div>
            <div className="hammenu" onClick={() => setshownav(true)}>
              <img src="/menu.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="inputnavholder">
        <div className="inputNav">
          <input
            pr="4.5rem"
            placeholder="Search by name/shortname/faculty"
            onKeyDown={(e) =>
              e.key === "Enter" ? searchh(e.target.value) : null
            }
          />
          <img
            src="/search.png"
            id="searchicon"
            alt=""
            onClick={(e) => {
              searchh(e.target.previousElementSibling.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
