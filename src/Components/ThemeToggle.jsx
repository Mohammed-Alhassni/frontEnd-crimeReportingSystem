import { useAppContext } from "../functionalities/AppContext";

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useAppContext();

    return (
        <button className="toggleButton" onClick={toggleTheme} style={{cursor: "pointer" }}>
            {isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
    );
};

export default ThemeToggle;
