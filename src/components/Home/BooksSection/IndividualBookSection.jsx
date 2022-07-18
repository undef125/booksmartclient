// import React, { useEffect, useState } from "react";
// import axios from "../../../api/api";
// import { useNavigate } from "react-router-dom";
// import getAccessToken from '../../../jwt/jwtauth';

// const IndividualBookSection = ({ faculty, gotdata }) => {
//     const navigate = useNavigate();

//     const [books, setBooks] = useState([]);

//     const navigateToDetails = (book) => {
//         navigate(`/details?q=${book._id}`);
//     };

//     useEffect(() => {
//         const fetchBook = async () => {
//             try {
//                 let res = await axios.get(
//                     `/getbooks/${faculty.toLowerCase()}`,
//                     {
//                         headers: {
//                             Authorization: getAccessToken(),
//                         },
//                     }
//                 );
//                 // res.data ? gotdata(true) : gotdata(false);
//                 setBooks(res.data);
//             } catch (error) {
//                 console.log("error: " + error);
//             }
//         };
//         fetchBook();
//     }, []);

//     return (
//         <>
//             {books.length > 0 ? ( //display only the faculties which have books
//                 <div className="innerHolder">
                    
//                 </div>
//             ) : null}
//         </>
//     );
// };

// export default IndividualBookSection;
