import React, { useEffect, useState } from "react";
import "./booksectionstyle.css";
import IndividualBookSection from "./IndividualBookSection";
import { useNavigate } from "react-router-dom";


const BookSection = () => {
  const navigate = useNavigate();


  const navigateToFaculty = (value) => {
    navigate(`/search?q=${value}`);
  }
    return (
      <div className="wholefaculties">
        <div className="BCT">
          <div className="left green">
            <div className="imgholder">
              <img src="bct.png" alt="" />
            </div>
          </div>
          <div className="right">
            <div className="facultyname">
            BCT
            </div>
            <div className="btn"><button onClick={() => navigateToFaculty("bct")}>Your Books are Here !!!</button></div>
          </div>
        </div>
        <div className="BCE">
          <div className="left">
          <div className="facultyname">
              BCE
            </div>
          <div className="btn"><button onClick={() => navigateToFaculty("bce")}>Your Books are Here !!!</button></div>
          </div>
          <div className="right green">
            <div className="imgholder">
              <img src="bce.png" alt="" />
            </div>
          </div>
        </div>
      
        <div className="BEI">
          <div className="left green">
            <div className="imgholder">
              <img src="bei.png" alt="" />
            </div>
          </div>
          <div className="right">
            <div className="facultyname">
              BEI
            </div>
            <div className="btn"><button onClick={() => navigateToFaculty("bei")}>Your Books are Here !!!</button></div>
          </div>
        </div>
        <div className="BAG">
          <div className="left">
          <div className="facultyname">
              BAG
            </div>
          <div className="btn"><button onClick={() => navigateToFaculty("bag")}>Your Books are Here !!!</button></div>
          </div>
          <div className="right green">
            <div className="imgholder">
              <img src="bag.png" alt="" />
            </div>
          </div>
        </div>
      
        <div className="BEL">
          <div className="left green">
            <div className="imgholder">
              <img src="bel.png" alt="" />
            </div>
          </div>
          <div className="right">
            <div className="facultyname">
              BEL
            </div>
            <div className="btn"><button onClick={() => navigateToFaculty("bel")}>Your Books are Here !!!</button></div>
          </div>
        </div>
        <div className="BAR">
          <div className="left">
          <div className="facultyname">
              BAR
            </div>
          <div className="btn"><button onClick={() => navigateToFaculty("bar")}>Your Books are Here !!!</button></div>
          </div>
          <div className="right green">
            <div className="imgholder">
              <img src="bar.png" alt="" />
            </div>
          </div>
        </div>
        <div className="BME">
          <div className="left green">
            <div className="imgholder">
              <img src="bme.png" alt="" />
            </div>
          </div>
          <div className="right">
            <div className="facultyname">
              BME
            </div>
            <div className="btn"><button onClick={() => navigateToFaculty("bme")}>Your Books are Here !!!</button></div>
          </div>
        </div>
      
      </div>
    )
}

export default BookSection;
