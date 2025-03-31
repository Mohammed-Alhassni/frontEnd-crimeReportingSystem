import '../styles/Header.css';
import ThemeToggle from './ThemeToggle';
import { useAppContext } from '../functionalities/AppContext';
import DropdownMenu from './DropdownMenu';


function Header(){
    const {isMobile} = useAppContext();

    return (
        <div>
            <div className="Header">
                <h2>Dash Board</h2>
                {!isMobile && <ThemeToggle/>}
            </div>
            {isMobile && <DropdownMenu/>}
        </div>
    );
}

export default Header;