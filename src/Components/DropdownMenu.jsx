import { useState } from "react";
import SideBar from './SideBar';
import '../styles/DropdownMenu.css';

const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown">
            <button onClick={toggleMenu} className="dropdown-button">
                ☰ Menu
            </button>
            
            {isOpen && <SideBar/>}
        </div>
    );
};

export default DropdownMenu;
