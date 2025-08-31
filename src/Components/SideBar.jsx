import '../styles/SideBar.css'
import { Link } from "react-router-dom";
import { useAppContext } from '../functionalities/AppContext';
import ThemeToggle from './ThemeToggle';


function SideBar(){
    const {isMobile}=useAppContext();
    return (
        <div className="sideBar">
            <h2> DashBoard </h2>
            <div><Link to="/Map">Crimes</Link></div>
            <div><Link to="/ReportSubmission">Report</Link></div>
            <div><Link to="/About">About</Link></div>
            {isMobile && <ThemeToggle/>}
        </div>
    );
}

export default SideBar;