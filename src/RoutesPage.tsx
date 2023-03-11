import {Routes, Route} from 'react-router-dom';
import  AddMaster  from './components/AddMaster/AddMaster';
import MaintenanceDetail from './components/MaintenanceDetail/Maintenance';
import Report from './components/Report/Report';

const RoutesPage = () => {
    return(
        <Routes>
            <Route path='/addMaster' element={<AddMaster/>}/>
            <Route path='/addDetail' element={<MaintenanceDetail></MaintenanceDetail>}/>
            <Route path='report' element={<Report></Report>}/>
        </Routes>
    )
}

export default RoutesPage