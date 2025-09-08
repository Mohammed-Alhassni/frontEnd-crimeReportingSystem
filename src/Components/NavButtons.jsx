import { Link } from "react-router-dom";
import ThemeToggle from './ThemeToggle';


function NavButtons(props){
    return (
        <div><Link to={`${props.link}`}>{props.name}</Link></div>
    );
}

export default NavButtons;