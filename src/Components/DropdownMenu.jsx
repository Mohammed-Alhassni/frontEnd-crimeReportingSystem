import { useState, useEffect, useRef  } from "react";
import SideBar from './SideBar';
import '../styles/DropdownMenu.css';

const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown" ref={menuRef}>
            <button onClick={toggleMenu} className="dropdown-button">
                ☰ Menu
            </button>
            
            {isOpen && <SideBar/>}
        </div>
    );
};

export default DropdownMenu;
