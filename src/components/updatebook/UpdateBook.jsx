import React, { useState, useRef } from "react";
import axios from "../../api/api";
import getAccessToken from "../../jwt/jwtauth";
import { useLocation,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateBook = () => {
  const location = useLocation();
  let book = location.state.book;
  const navigate = useNavigate();

  const form = useRef(null);
  const [isacademic, setisacademic] = useState(false);
  if (book.category === "academic") setisacademic(true);
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
    e.preventDefault();

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let toupdate = params.get("q");
    
    //for image using form data
    const data = new FormData(form.current);
    data.delete("negotiable"); //getting away from bool cast error
    if (data.get("price") === null) {
      data.set("free", true);
      data.set("price", 0);
    } else {
      data.set("free", false);
    }    
    const id = toast.loading("requesting for updating book!");
    try {
      await axios.post(`/update/${toupdate}`, data, {
      headers: {
        Authorization: getAccessToken(),
      },
    });
    toast.update(id, {render: "Book updated successfully", type: "success", isLoading:false, autoClose: 1000, toastId: "ttowotw"});
    navigate('/profile');
    } catch (error) {
      console.log(error)
      toast.update(id, {render: "error posting check all fields!", type: "error", isLoading:false, autoClose: 1000, toastId: "trtwsadfasd"});
    }
  };

  return (
    <div className="formpage">
      <div className="formholder">
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
            className="checkbox"
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
              value={previousBook.price}
              onChange={(e) =>
                setpreviousBook({
                  ...previousBook,
                  price: e.target.value,
                })
              }
            />
          )}

          {isacademic && (
            <>
              <h2>Choose Faculties</h2>
              <div className="facultyholder">
                <div className="checkboxholder">
                  <input
                    type="checkbox"
                    className="checkbox"
                    name="faculties"
                    id="bct"
                    value="BCT"
                  />
                  <label htmlFor="bct">BCT</label>
                </div>
                <div className="checkboxholder">
                  <input
                    type="checkbox"
                    className="checkbox"
                    name="faculties"
                    id="bme"
                    value="BME"
                  />
                  <label htmlFor="bme">BME</label>
                </div>
                <div className="checkboxholder">
                  <input
                    type="checkbox"
                    className="checkbox"
                    name="faculties"
                    id="bce"
                    value="BCE"
                  />
                  <label htmlFor="bce">BCE</label>
                </div>
                <div className="checkboxholder">
                  <input
                    type="checkbox"
                    className="checkbox"
                    name="faculties"
                    id="bei"
                    value="BEI"
                  />
                  <label htmlFor="bei">BEI</label>
                </div>
                <div className="checkboxholder">
                  <input
                    type="checkbox"
                    className="checkbox"
                    name="faculties"
                    id="bel"
                    value="BEL"
                  />
                  <label htmlFor="bel">BEL</label>
                </div>
                <div className="checkboxholder">
                  <input
                    type="checkbox"
                    className="checkbox"
                    name="faculties"
                    id="bag"
                    value="BAG"
                  />
                  <label htmlFor="bag">BAG</label>
                </div>
                <div className="checkboxholder">
                  <input
                    type="checkbox"
                    className="checkbox"
                    name="faculties"
                    id="bar"
                    value="BAR"
                  />
                  <label htmlFor="bar">BAR</label>
                </div>
              </div>
            </>
          )}
          <br />
          <input
            type="checkbox"
            className="checkbox"
            name="negotiable"
            id="negotiable"
            checked={previousBook.negotiable}
            onChange={() =>
              setpreviousBook({
                ...previousBook,
                negotiable: !previousBook.negotiable,
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
            onClick={() => setisacademic(true)}
          />
          <label htmlFor="academic">Academic</label>
          <input
            type="radio"
            name="category"
            id="unacademic"
            value="unacademic"
            onClick={() => setisacademic(false)}
          />
          <label htmlFor="unacademic">Unacademic</label>
          <br />
          <button type="submit">
            Update Book Detail
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
