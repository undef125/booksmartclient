import React, { useContext } from "react";
import { DataContext } from "../../../context/DataProvider";
import "./navstyle.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../../api/api";
import { toast } from 'react-toastify';

const Navbar = () => {
    const navigate = useNavigate();
    const { searchedData, setsearchedData ,userName} = useContext(DataContext);

    const searchh = (value) => {
        setsearchedData(value);
        navigate(`/search?q=${value}`);
    };

    const navigateToProfile = () => {
        navigate(`/profile?q=${userName}`);
    }
    const logoutUser = () => {
        // let refToken = sessionStorage.getItem("refreshToken");
        // await axios.get("/delreftoken",{token: refToken});
        sessionStorage.clear("accessToken");
        sessionStorage.clear("refreshToken");
        toast.warning("Logout Successfull!", {autoClose: 1000, toastId: "logout"})
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
                        <Link to="/sellbook">
                            {" "}
                            <div className="Categories">Sell Book</div>
                        </Link>
                        <Link to="/freebooks">
                            {" "}
                            <div className="Categories">Free Books</div>
                        </Link>
                        <Link to="/unacademicbooks">
                            {" "}
                            <div className="Categories">Unacademic Books</div>
                        </Link>
                        <div className="profile" onClick={navigateToProfile}>Profile</div>
                        <div className="logout" onClick={logoutUser}>
                            Log Out
                        </div>
                    </div>
                </div>
            </div>
            <div className="inputnavholder">
            <div className="inputNav">
                <input
                    pr="4.5rem"
                    placeholder="Search by name/shortname/faculty"
                    onKeyDown={e => e.key === "Enter" ? (searchh(e.target.value)) : null}
                />
             <img src="/search.png" id="searchicon" alt=""  onClick={(e) => {
                        searchh(e.target.previousElementSibling.value)
                    }}
                        />
            </div>
        </div>
        </div>
    );
};

export default Navbar;
