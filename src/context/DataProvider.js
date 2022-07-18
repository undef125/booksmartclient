import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    const [searchedData, setsearchedData] = useState("");
    const [userName, setuserName] = useState('');
    const [userEmail, setuserEmail] = useState('');
    const [userId, setuserId] = useState('');
    const [loader, setloader] = useState(false);

    return (
        <DataContext.Provider value={{searchedData, setsearchedData, userName, setuserName, userEmail, setuserEmail,userId, setuserId,loader,setloader}}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;