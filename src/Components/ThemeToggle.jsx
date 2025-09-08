import { useAppContext } from "../functionalities/AppContext";

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useAppContext();

    return (
        <button 
            className="toggleButton" 
            onClick={toggleTheme}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
            <span className="theme-icon">
                {isDarkMode ? "🌙" : "☀️"}
            </span>
            <span>
                {isDarkMode ? "Dark Mode" : "Light Mode"}
            </span>
        </button>
    );
};

export default ThemeToggle;
