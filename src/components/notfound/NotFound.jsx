import React from 'react';
import "./notfoundstyle.css"

const NotFound = ({towarn}) => {
  return (
    <div className='notfoundcontainer'>
        <div><p className="oops" >Oops...........</p></div>
        <div><p className="towarn">{towarn}</p></div>
        <div className="notfoundimgholder">
            <img src="/notfound.png" alt="" />
        </div>
    </div>
  )
}

export default NotFound;