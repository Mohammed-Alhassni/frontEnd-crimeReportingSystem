import Map from './Map';
import Report from './Report';
import '../styles/MainContent.css';
import { Routes, Route } from 'react-router-dom';

function MainContent(){
    return (
         <div className='MainContent'>
            <Routes>
                <Route path='/' element={<Map/>}/>
                <Route path='/Map' element={<Map/>}/>
                <Route path='/SubmitReport' element={<Report/>}/>
            </Routes>
         </div>
    );
}

export default MainContent;