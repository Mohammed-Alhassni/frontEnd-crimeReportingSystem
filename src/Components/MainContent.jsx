import Map from './Map';
import CrimeList from './CrimeList';
import Report from './Report';
import About from './About';
import '../styles/MainContent.css';
import { Routes, Route } from 'react-router-dom';

function MainContent(){
    return (
         <div className='MainContent'>
            <Routes>
                <Route path='/' element={<Map/>}/>
                <Route path='/Map' element={<Map/>}/>
                <Route path='/List' element={<CrimeList/>}/>
                <Route path='/SubmitReport' element={<Report/>}/>
                <Route path='/About' element={<About/>}/>
            </Routes>
         </div>
    );
}

export default MainContent;