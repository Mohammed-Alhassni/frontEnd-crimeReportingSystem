import '../styles/Header.css';
import ThemeToggle from './ThemeToggle';
import { useAppContext } from '../functionalities/AppContext';
import DropdownMenu from './DropdownMenu';


function Header(){
    const {isMobile} = useAppContext();

    return (
        <div className="Header">
            <h2>Dash Board</h2>
            {isMobile? <DropdownMenu/>: <ThemeToggle/>}
        </div>
    );
}

export default Header;