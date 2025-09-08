import Map from './Map';
import ReportSubmit from './ReportSubmit';
import About from './About';
import '../styles/MainContent.css';
import { Routes, Route, useLocation } from 'react-router-dom';

function MainContent(){
    const location = useLocation();
    
    const getPageInfo = () => {
        switch(location.pathname) {
            case '/Map':
                return { title: 'Crime Map', subtitle: 'Explore crime data in your area' };
            case '/ReportSubmission':
                return { title: 'Report Crime', subtitle: 'Submit a new crime report' };
            case '/About':
                return { title: 'About CrimeWatch', subtitle: 'Learn about our community safety platform' };
            default:
                return { title: 'Crime Map', subtitle: 'Explore crime data in your area' };
        }
    };
    
    const pageInfo = getPageInfo();

    return (
        <div className='MainContent'>
            <div className="content-wrapper">
                <header className="content-header">
                    <h1 className="page-title">{pageInfo.title}</h1>
                    <p className="page-subtitle">{pageInfo.subtitle}</p>
                </header>
                
                <main className="content-body">
                    <Routes>
                        <Route path='/' element={<Map/>}/>
                        <Route path='/Map' element={<Map/>}/>
                        <Route path='/ReportSubmission' element={<ReportSubmit/>}/>
                        <Route path='/About' element={<About/>}/>
                    </Routes>
                </main>
            </div>
        </div>
    );
}

export default MainContent;