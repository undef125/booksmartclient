import "./App.css";
import Home from "./components/Home/Home";
import DataProvider from "./context/DataProvider";
import { Routes, Route,Navigate,Outlet } from "react-router-dom";
import Searched from "./components/searchedpage/Searched";
import Navbar from "./components/Home/Navbar/Navbar";
import Details from "./components/detail/Details";
import SellBook from "./components/sellbook/SellBook";
import FreeBooks from "./components/freebooks/FreeBooks";
import UpdateBook from "./components/updatebook/UpdateBook";
import UnacademicBooks from "./components/unacademicbooks/UnacademicBooks";
import Profile from "./components/profile/Profile";
import Chat from './components/chat/Chat';
import Login from "./login/Login";
import Footer from "./components/footer/Footer";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const PrivateRoute = ({isAuthenticated, ...props}) => {
    return isAuthenticated ? (
        <>
        <Navbar />
        <Outlet />
        <Footer />
        </>
    ) : (
        <Navigate replace to="/login" />
    )
}

function App() {

    const [isAuthenticated, setisAuthenticated] = useState(false);

    return (
        <DataProvider>
            <div className="App">
              <ToastContainer limit={1}/>
                <Routes>
                    <Route path="/login" element={<Login setisAuthenticated={setisAuthenticated}/>} />
                    <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<Searched />} />
                        <Route path="/details" element={<Details />} />
                        <Route path="/sellbook" element={<SellBook />} />
                        <Route path="/freebooks" element={<FreeBooks />} />
                        <Route path="/unacademicbooks" element={<UnacademicBooks />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/updatebook" element={<UpdateBook />} />
                        <Route path="/chat" element={<Chat />} />
                </Route>

                </Routes>
            </div>
        </DataProvider>
    );
}

export default App;
