import '../styles/SideBar.css'
import { Link } from "react-router-dom";


function SideBar(){
    return (
        <div className="sideBar">
            <button><Link to="/Map">Reported Crimes</Link></button>
            <button><Link to="/List">Crimes List</Link></button>
            <button><Link to="/SubmitReport">Report a Crime</Link></button>
            <button><Link to="/About">About</Link></button>
        </div>
    );
}

export default SideBar;