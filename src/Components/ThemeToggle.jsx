import { useAppContext } from "../functionalities/AppContext";

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useAppContext();

    return (
        <button onClick={toggleTheme} style={{ padding: "10px", cursor: "pointer" }}>
            {isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
    );
};

export default ThemeToggle;
