import '../styles/Header.css';
import { useMediaQuery } from 'react-responsive';

function Header(){
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return (
        <div className="Header">
            <h2>Dash Board</h2>
            {isMobile? <div>Place Holder Mobile</div>: <div>Place Holder Desktop</div>}
        </div>
    );
}

export default Header;