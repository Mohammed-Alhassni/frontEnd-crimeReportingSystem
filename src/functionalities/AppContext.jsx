import { useContext, createContext, useState } from "react";
import { useMediaQuery } from "react-responsive";


const AppContext = createContext(null);

const AppProvider = ({ children }) => {

    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });


    const [isDarkMode, setIsDarkMode] = useState(false);


    const toggleDarkMode = () => setIsDarkMode(prev => !prev);

    return (
        <AppContext.Provider value={{ isMobile, isDarkMode, toggleDarkMode }}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};

export { AppProvider, useAppContext };
