import '../styles/SideBar.css'
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from '../functionalities/AppContext';
import ThemeToggle from './ThemeToggle';

function SideBar(){
    const { isMobile } = useAppContext();
    const location = useLocation();
    
    const navItems = [
        { 
            to: "/Map", 
            label: "Crime Map", 
            icon: "🗺️",
            description: "View crime locations"
        },
        { 
            to: "/ReportSubmission", 
            label: "Report Crime", 
            icon: "📝",
            description: "Submit new report"
        },
        { 
            to: "/About", 
            label: "About", 
            icon: "ℹ️",
            description: "Learn more"
        }
    ];

    return (
        <div className="sideBar">
            <div className="sidebar-header">
                <h2 className="sidebar-title">🚨 CrimeWatch</h2>
                <p className="sidebar-subtitle">Community Safety Dashboard</p>
            </div>
            
            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <Link 
                        key={item.to}
                        to={item.to} 
                        className={location.pathname === item.to ? 'active' : ''}
                        title={item.description}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
            
            <div className="sidebar-footer">
                <ThemeToggle/>
            </div>
        </div>
    );
}

export default SideBar;