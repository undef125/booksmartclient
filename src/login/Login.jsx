import React from "react";
import { useState, useContext } from "react";
import axios from "../api/api";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import "./loginstyle.css";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../components/loader/Loader";

const Login = ({ setisAuthenticated }) => {
  const navigate = useNavigate();

  const [toggle, settoggle] = useState("login");
  const [name, setname] = useState("");
  const [email, setemail] = useState("kapilrandom55@gmail.com");
  const [password, setpassword] = useState("kapil");
  const [otp, setotp] = useState("");
  const [loader, setloader] = useState(false);

  const { setuserName, setuserEmail, userName, userEmail, userId, setuserId} =
    useContext(DataContext);

  //toggling between login and signup
  const toggleClear = () => {
    toggle === "login" ? settoggle("signup") : settoggle("login");
    setname("");
    setemail("");
    setpassword("");
  };

  // getting otp
  const getOTP = async () => {
    //validate form
    if (
      name.trim("") === "" ||
      email.trim("") === "" ||
      password.trim("") === ""
    ) {
      toast.warning("Please fill all the input field", { autoClose: 1000, toastId: "validate1"});
    } else {
      try {
          let result = await axios.post("/getotp", {
              name: name,
              email: email,
            });
            toast.success("OTP Sent!",{autoClose: 1000});
      } catch (error) {
        toast.error(error.response.data.message,{autoClose: 1000,toastId: "once"});
      }
    }
  };

  //authenticate user
  const loginUser = async () => {
    //validate form
    if (email.trim("") === "" || password.trim("") === "") {
      toast.warning("Please fill all the input field", { autoClose: 1000, toastId: "validate2"});
    } else {
      try {
        setloader(true);
        let result = await axios.post("/login", {
          email: email,
          password: password,
        });
        sessionStorage.setItem(
          "accessToken",
          `Bearer ${result.data.accessToken}`
        );
        setloader(false);
        toast.success("login successful!",{autoClose: 1000, toastId: "random3"});
        setuserName(result.data.name);
        setuserEmail(result.data.email);
        setuserId(result.data.id);
        setisAuthenticated(true);
        navigate("/");
      } catch (error) {
        setloader(false);
        try {
          toast.error(error.response.data.message, {autoClose: 1000, toastId: "random4"});
        } catch (error) {
          toast.error("Cannot connect to database!", {autoClose: 1000, toastId: "random90"});
        }
      }
    }
  };

  // register user
  const signupUser = async () => {
    //validate form
    if (
      name.trim("") === "" ||
      email.trim("") === "" ||
      password.trim("") === "" ||
      otp.trim("") === ""
    ) {
      toast.warning("Please fill all the input field", { autoClose: 1000, toastId: "validate3"});
    } else {
      //register user
      try {
        setloader(true);
        await axios.post("/signup", {
          name: name,
          email: email,
          password: password,
          otp: otp,
        });
        setloader(false);
        toast.success("user signed up successfully!", {autoClose: 1000, toastId: "random2"});
        toggleClear();
      } catch (error) {
        setloader(false);
        toast.error(error.response.data.message, {autoClose: 1000 , toastId: "random1"});
      }
    }
  };

  return (
    <div className="authenticatepage">
      { loader && <Loader /> }
      {toggle === "login" ? (
        <div className="loginholder">
          <div className="loginBox">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password here"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <div className="btnholder">
              <button onClick={loginUser}>Login</button>
            </div>
            <p>Don't have an account?</p>
            <div className="btnholder">
              <button onClick={toggleClear}>Sign Up</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="signupholder">
          <div className="signUpBox">
            <input
              type="text"
              placeholder="your name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password here"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <div className="otpholder">
              <input
                type="text"
                placeholder="enter otp"
                value={otp}
                onChange={(e) => setotp(e.target.value)}
              />
              <button className="otpbtn" onClick={getOTP}>
                Get OTP
              </button>
              <ToastContainer />
            </div>
            <div className="btnholder">
              <button onClick={signupUser}>Sign Up</button>
              <ToastContainer />
            </div>
            <p>Already have an account?</p>
            <div className="btnholder">
              <button onClick={toggleClear}>Login</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
