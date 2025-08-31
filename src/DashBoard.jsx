import HeaderMobile from './Components/HeaderMobile';
import SideBar from './Components/SideBar';
import MainContent from './Components/MainContent';
import { useAppContext } from './functionalities/AppContext';


function DashBoard(){
    const {isMobile} = useAppContext();

    return (
        <>
            {isMobile ? <HeaderMobile/> : <SideBar/>}
            <MainContent/>
        </>
    );
}

export default DashBoard;