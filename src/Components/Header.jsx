import '../styles/Header.css';
import { useMediaQuery } from 'react-responsive';
import { useAppContext } from '../functionalities/AppContext';

function Header(){
    const {isMobile} = useAppContext();

    return (
        <div className="Header">
            <h2>Dash Board</h2>
            {isMobile? <div>Place Holder Mobile</div>: <div>Place Holder Desktop</div>}
        </div>
    );
}

export default Header;