import React from "react";
import "./footerstyle.css";

const Footer = () => {
  return (
    <div className="footerholder">
      <div className="footerleft">
        <div className="logoholder">
          <img src="finallogo50.png" alt="" />
        </div>
      </div>
      <div className="footermiddle">
     <p className="copy">&copy;</p> 
     <p> All rights reserved by Booksmart.</p>
      
      </div>
      <div className="footerright">
        <div className="iconsholder">
          <div className="iconholder">
            <img src="facebook1.png" alt="" />
          </div>
          <div className="iconholder">
            <img src="instagram1.png" alt="" />
          </div>
          <div className="iconholder">
            <img src="telegram.png" alt="" />
          </div>
          <div className="iconholder">
            <img src="twitter.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
