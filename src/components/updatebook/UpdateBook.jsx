import React, { useState, useRef } from "react";
import axios from "../../api/api";
import getAccessToken from "../../jwt/jwtauth";
import { useLocation } from "react-router-dom";

const UpdateBook = () => {
    const location = useLocation();
    let book = location.state.book;
    const form = useRef(null);

    const [previousBook, setpreviousBook] = useState({
        name: book.name,
        shortName: book.shortName,
        price: book.price,
        negotiable: book.negotiable,
        faculties: book.faculties,
        image: book.image,
        free: book.free,
        category: book.category,
        seller: book.seller,
        email: book.email,
    });

    const updateDB = async (e) => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let toupdate = params.get("q");

        //for image using form data
        e.preventDefault();
        const data = new FormData(form.current);
        data.delete('negotiable');                      //getting away from bool cast error
        if(data.get("price") === null) {
            console.log("it's free");
            data.set("free", true);
            data.set("price", 0);
        }
        else {
            data.set("free", false)
        }

        let result = await axios.put(`/update/${toupdate}`, data,{
            headers: {
              Authorization: getAccessToken(),
          }
          });
        console.log("result: " + result)
    };

    return (
        <form onSubmit={updateDB} ref={form}>
            <input type="file" name="image" id="imageurl" />
            <br />
            <input
                type="text"
                name="name"
                placeholder="input book's name"
                value={previousBook.name}
                onChange={(e) =>
                    setpreviousBook({
                        ...previousBook,
                        name: `${e.target.value}`,
                    })
                }
            />
            <br />
            <input
                type="text"
                name="shortName"
                placeholder="input book's short name"
                value={previousBook.shortName}
                onChange={(e) =>
                    setpreviousBook({
                        ...previousBook,
                        shortName: e.target.value,
                    })
                }
            />
            <br />

            <input
                type="checkbox"
                name="free"
                id="free"
                checked={previousBook.free}
                onChange={() =>
                    setpreviousBook({
                        ...previousBook,
                        free: !previousBook.free,
                    })
                }
            />
            <label htmlFor="free">Sell For Free</label>
            <br />

            {!previousBook.free && (
                <input
                    type="number"
                    name="price"
                    placeholder="book price"
                    value={book.price}
                    onChange={(e) =>
                        setpreviousBook({
                            ...previousBook,
                            price: e.target.value,
                        })
                    }
                />
            )}

            <h2>Choose Faculties</h2>
            <input type="checkbox" name="faculties" id="bct" value="BCT" />
            <label htmlFor="bct">BCT</label>
            <input type="checkbox" name="faculties" id="bme" value="BME" />
            <label htmlFor="bme">BME</label>
            <input type="checkbox" name="faculties" id="bce" value="BCE" />
            <label htmlFor="bce">BCE</label>
            <input type="checkbox" name="faculties" id="bei" value="BEI" />
            <label htmlFor="bei">BEI</label>
            <input type="checkbox" name="faculties" id="bel" value="BEL" />
            <label htmlFor="bel">BEL</label>
            <input type="checkbox" name="faculties" id="bag" value="BAG" />
            <label htmlFor="bag">BAG</label>
            <input type="checkbox" name="faculties" id="bar" value="BAR" />
            <label htmlFor="bar">BAR</label>
            <br />
            <input
                type="checkbox"
                name="negotiable"
                id="negotiable"
                checked={previousBook.negotiable}
                onChange={() =>
                    setpreviousBook({
                        ...previousBook,
                        free: !previousBook.negotiable,
                    })
                }
            />
            <label htmlFor="negotiable">Negotiable</label>
            <br />
            <input
                type="radio"
                name="category"
                id="academic"
                value="academic"
            />
            <label htmlFor="academic">Academic</label>
            <input
                type="radio"
                name="category"
                id="unacademic"
                value="unacademic"
            />
            <label htmlFor="unacademic">Unacademic</label>
            <br />
            <button type="submit" onClick={updateDB}>Update Book Detail</button>
        </form>
    );
};

export default UpdateBook;
