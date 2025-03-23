import { useMediaQuery } from 'react-responsive';
import MainContent from './MainContent';
import SideBar from './SideBar';
import '../styles/Body.css';

function Body(){
    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

    return (
        <div className="mainBody">
            {isDesktop && <SideBar/>}   
            <MainContent/>
        </div>
    );
}

export default Body;