import React, { useEffect, useState } from "react";
import DisplaySearched from "../display/Display";
import axios from "../../api/api";
import getAccessToken from '../../jwt/jwtauth';

const FreeBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBook = async () => {
            //getting value from url query
            let res = await axios.get(`/getfreebooks`, {
                headers: {
                    Authorization: getAccessToken(),
                },
            });
            setBooks(res.data);
            console.log(res);
        };
        fetchBook();
    }, []);
    return (
        <div>
            {books.map((book) => {
                return (
                    <>
                        <DisplaySearched book={book} />
                    </>
                );
            })}
        </div>
    );
};

export default FreeBooks;
