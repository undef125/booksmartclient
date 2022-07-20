import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    const [searchedData, setsearchedData] = useState("");
    const [userName, setuserName] = useState('');
    const [userEmail, setuserEmail] = useState('');
    const [userId, setuserId] = useState('');

    return (
        <DataContext.Provider value={{searchedData, setsearchedData, userName, setuserName, userEmail, setuserEmail,userId, setuserId}}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;