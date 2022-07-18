import React, { useState, useRef } from "react";
import "./sellstyle.css";
import axios from "../../api/api";
import getAccessToken from "../../jwt/jwtauth";
import { useContext } from "react";
import { DataContext } from "./../../context/DataProvider";
import { toast } from "react-toastify";

const SellBook = () => {
  const form = useRef(null);


  const [image, setimage] = useState("");
  const [negotiable, setnegotiable] = useState(false);
  const [unacademic, setunacademic] = useState(false);
  const [free, setfree] = useState(false);
  const [error, seterror] = useState(false);

  const { userName, userId } = useContext(DataContext);

  const formValidation = (key,value) => {
    let academic = false;
    if(!image) seterror(true) 
    else seterror(false);
    let checkarray = [key.split(",")[0]];
    checkarray.push()
    // if(value === "") seterror(true);
    // if(key.split(",")[0] === "") seterror(true);
    console.log(key.split(",")[0],key.split(",")[1]);
    if(key.split(",")[0] === "academic") {
        console.log("heheh")
        academic = true;
    }
    if(key.split(",")[1] === "") {
        seterror(true);
        console.log("Error!!");
    }
    if(academic===true && checkarray.includes("categories") === false) {
        seterror(true);
    }
  }

  const saveToDb = async (e) => {

    //for image using form data
    e.preventDefault();
    const data = new FormData(form.current);
    for(const pair of data.entries()) {
        // console.log(`${pair[0]}, ${pair[1]}`);
        formValidation(`${pair[0]},${pair[1]}`);
      }
    data.delete("negotiable"); //getting away from bool cast error
    data.append("seller", userName);
    data.append("sellerid", userId);
    data.append("negotiable", negotiable);
    if (data.get("price") === null) {
      console.log("it's free");
      data.set("free", true);
      data.set("price", 0);
    } else {
      data.set("free", false);
    }

    let result = await axios.post("/postbook", data, {
      headers: {
        Authorization: getAccessToken(),
      },
    });
    if(result.response.data === undefined) toast.error("Network error")
    else if(result.status === 200) toast.success("Book posted for sell successfully")
    else toast.error(result.code)
  };

  return (
    <div className="formholder">
        {error && <p style={{color: "red"}}> Fill all the required input!</p>}
      <form onSubmit={saveToDb} ref={form}>
        <input type="file" name="image" id="imageurl" onChange={(e) => setimage(e.target.value)}/>
        <br />
        <input type="text" name="name" placeholder="input book's name" />
        <br />
        <input
          type="text"
          name="shortName"
          placeholder="input book's short name"
        />
        <br />
        <input type="text" name="description" placeholder="write description" />
        <br />
        <div className="checkboxholder">
          <input
            type="checkbox"
            className="checkbox"
            name="free"
            id="free"
            onChange={() => setfree(!free)}
          />
          <label htmlFor="free">Sell For Free</label>
        </div>
        <br />
        {!free && (
          <>
            <input type="number" name="price" placeholder="book price" />
            <div className="checkboxholder">
              <input
                type="checkbox"
                className="checkbox"
                name="negotiable"
                id="negotiable"
                onChange={() => setnegotiable(!negotiable)}
              />
              <label htmlFor="negotiable">Negotiable</label>
            </div>{" "}
          </>
        )}
        <h2>Choose Category</h2>
        <div className="radioholder">
          <input
            type="radio"
            name="category"
            id="academic"
            value="academic"
            onChange={(e) =>
              e.target.checked === true ? setunacademic(true) : null
            }
          />
          <label htmlFor="academic">Academic</label>
          <input
            type="radio"
            name="category"
            id="unacademic"
            value="unacademic"
            onChange={(e) =>
              e.target.checked === true ? setunacademic(false) : null
            }
          />
          <label htmlFor="unacademic">Unacademic</label>
        </div>
        {unacademic && (
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

        <br />
        <button className="submitbtn" type="submit">
          Post Book For Sell
        </button>
      </form>
    </div>
  );
};

export default SellBook;
