import { useMediaQuery } from 'react-responsive';
import MainContent from './MainContent';
import SideBar from './SideBar';
import '../styles/Body.css';
import { useAppContext } from '../functionalities/AppContext';

function Body(){
    const {isMobile} = useAppContext();

    return (
        <div className="mainBody">
            {!isMobile && <SideBar/>}   
            <MainContent/>
        </div>
    );
}

export default Body;