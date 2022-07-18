import React, {useEffect, useState} from 'react';
import DisplaySearched from '../display/Display';
import axios from '../../api/api';
import getAccessToken from '../../jwt/jwtauth';
import "./unacademicstyle.css"

const UnacademicBooks = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBook = async () => {
            //getting value from url query
                let res = await axios.get(`/unacademicbooks`,{
                  headers: {
                    Authorization: getAccessToken(),
                }
                });
                setBooks(res.data);
        };
        fetchBook();
    }, []);
    
  return (
    <div className="resultholder">
        {
          books.map(book => {
            return(
              <>
                <DisplaySearched book={book} />
              </>
            )
          })
        } 
    </div>
  )
}

export default UnacademicBooks