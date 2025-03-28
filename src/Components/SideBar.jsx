import '../styles/SideBar.css'
import { Link } from "react-router-dom";


function SideBar(){
    return (
        <div className="sideBar">
            <div><Link id to="/Map">Reported Crimes</Link></div>
            <div><Link to="/ReportSubmission">Report a Crime</Link></div>
            <div><Link to="/About">About</Link></div>
        </div>
    );
}

export default SideBar;