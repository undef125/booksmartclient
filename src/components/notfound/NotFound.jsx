import React from 'react'

const NotFound = ({towarn}) => {
  return (
    <div style={{height: "60vh", display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center"}}>
        <p style = {{fontSize: "3rem"}}>Oops...........</p>
        <h2 style = {{fontSize: "2rem"}}>{towarn}</h2>
        <div className="notfoundimgholder" style={{ height: " 8rem ", width: " 8rem "}}>
            <img style={{ height: "100%", widht: "100%", objectFit: "cover"}} src="/notfound.png" alt="" />
        </div>
    </div>
  )
}

export default NotFound