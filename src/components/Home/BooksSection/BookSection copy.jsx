import React, { useEffect, useState } from "react";
import "./booksectionstyle.css";
import axios from "axios";
import IndividualBookSection from "./IndividualBookSection";


const BookSection = () => {
    const [gotdata, setgotdata] = useState(false);
    useEffect(() => {

    },[gotdata]);
    
    const faculties = ["BCT", "BME", "BCE", "BEL", "BEI", "BAG", "BAR"];

    return (
        <div className="sectionHolder">
            {faculties.map((faculty) => {
              return(
                <IndividualBookSection faculty={faculty} gotdata={setgotdata}/>
              )
            })}
        </div>
    );
};

export default BookSection;
