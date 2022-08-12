import React from "react";
import { useNavigate } from "react-router-dom";
import "./booksectionstyle.css";

const BookSection = () => {
  const navigate = useNavigate();

  const navigateToFaculty = (value) => {
    navigate(`/search?q=${value}`);
  };

  const OddBook = ({ faculty, imgname }) => {
    return (
      <div className={`${faculty} oddfaculties`}>
        <div className="left">
          <div className="imgholder">
            <img src={`${imgname}.png`} alt="" />
          </div>
        </div>
        <div className="right">
          <div className="facultyname">{faculty}</div>
          <div className="btn">
            <button onClick={() => navigateToFaculty(`${faculty}`)}>
              Your Books are Here !!!
            </button>
          </div>
        </div>
      </div>
    );
  };
  const EvenBook = ({ faculty, imgname }) => {
    return (
      <div className={`${faculty} evenfaculties`}>
        <div className="left">
          <div className="facultyname">{faculty}</div>
          <div className="btn">
            <button onClick={() => navigateToFaculty(`${faculty}`)}>
              Your Books are Here !!!
            </button>
          </div>
        </div>
        <div className="right">
          <div className="imgholder">
            <img src={`${imgname}.png`} alt="" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="wholefaculties">
      <OddBook faculty={"BCT"} imgname={"bct"} />
      <EvenBook faculty={"BCE"} imgname={"bce"} />
      <OddBook faculty={"BEI"} imgname={"bei"} />
      <EvenBook faculty={"BAG"} imgname={"bag"} />
      <OddBook faculty={"BEL"} imgname={"bel"} />
      <EvenBook faculty={"BAR"} imgname={"bar"} />
      <OddBook faculty={"BME"} imgname={"bme"} />
    </div>
  );
};

export default BookSection;
