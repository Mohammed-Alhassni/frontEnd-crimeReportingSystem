import HeaderMobile from './Components/HeaderMobile';
import SideBar from './Components/SideBar';
import MainContent from './Components/MainContent';
import { useAppContext } from './functionalities/AppContext';


function DashBoard(){
    const {isMobile} = useAppContext();

    return (
        <div className="dashboard-container">
            {isMobile ? <HeaderMobile/> : <SideBar/>}
            <MainContent/>
        </div>
    );
}

export default DashBoard;