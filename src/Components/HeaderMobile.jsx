import '../styles/HeaderMobile.css';
import ThemeToggle from './ThemeToggle';
import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

function HeaderMobile(){
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest('.mobile-header-container')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isOpen]);

    const navItems = [
        { 
            to: "/Map", 
            label: "Crime Map", 
            icon: "🗺️"
        },
        { 
            to: "/ReportSubmission", 
            label: "Report Crime", 
            icon: "📝"
        },
        { 
            to: "/About", 
            label: "About", 
            icon: "ℹ️"
        }
    ];

    return (
        <div className="mobile-header-container">
            <header className="mobile-header">
                <h1 className="mobile-header-title">
                    <span>🚨</span>
                    CrimeWatch
                </h1>
                <button 
                    onClick={toggleMenu} 
                    className={`mobile-menu-button ${isOpen ? 'active' : ''}`}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isOpen}
                >
                    <span className="menu-icon">
                        {isOpen ? '✕' : '☰'}
                    </span>
                    <span>{isOpen ? 'Close' : 'Menu'}</span>
                </button>   
            </header>

            {/* Dropdown menu */}
            <div className={`mobile-dropdown ${isOpen ? 'show' : 'hide'}`}>
                <nav className="mobile-nav">
                    {navItems.map((item) => (
                        <Link 
                            key={item.to}
                            to={item.to} 
                            className={`mobile-nav-item ${location.pathname === item.to ? 'active' : ''}`}
                            onClick={closeMenu}
                        >
                            <span className="nav-item-icon">{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
                
                <div className="mobile-theme-toggle">
                    <ThemeToggle/>
                </div>
            </div>

            {/* Overlay */}
            {isOpen && <div className="mobile-overlay active" onClick={closeMenu}></div>}
        </div>
    );
}

export default HeaderMobile;