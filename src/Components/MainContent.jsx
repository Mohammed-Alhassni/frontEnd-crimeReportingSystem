import Map from './Map';
import ReportSubmit from './ReportSubmit';
import About from './About';
import '../styles/MainContent.css';
import { Routes, Route } from 'react-router-dom';

function MainContent(){
    return (
         <div className='MainContent'>
            <Routes>
                <Route path='/' element={<Map/>}/>
                <Route path='/Map' element={<Map/>}/>
                <Route path='/ReportSubmission' element={<ReportSubmit/>}/>
                <Route path='/About' element={<About/>}/>
            </Routes>
         </div>
    );
}

export default MainContent;