import { useContext, createContext, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";


const AppContext = createContext(null);

const AppProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme") === "dark");
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    return (
        <AppContext.Provider value={{ isMobile, isDarkMode, toggleTheme }}>
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

export { AppProvider, useAppContext};
