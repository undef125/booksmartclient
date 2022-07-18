import React from "react";
import "./bannerstyle.css";

const Banner = () => {
  return (
    <div className="bannerHolder">
      <div className="left">
        <div className="booksmart">
          BOOK-S-MART
        </div>
        <div className="QUOTATION">
      "Use booksmart to make wise book purchases. "
        </div>
      </div>
      <div className="right">
        <img src="landingpage.png" alt="" />
      </div>
    </div>
  );
};

export default Banner;
