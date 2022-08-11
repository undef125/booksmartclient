import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Triangle,TailSpin } from  'react-loader-spinner';
import "./loaderstyle.css"

export const LoaderTriangle = () => {
  return (
    <div>
      {/* <Audio height="100" width="100" color="grey" ariaLabel="loading" /> */}
      <Triangle color="#60c3ad" height={150} width={150} />
    </div>
  );
};
export const LoaderCircle = () => {
  return (
    <div>
      {/* <Audio height="100" width="100" color="grey" ariaLabel="loading" /> */}
      <TailSpin color="#60c3ad" height={150} width={150}/>
    </div> 
  );
};


