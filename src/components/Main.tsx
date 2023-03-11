import {Routes, Route} from 'react-router-dom';
import  AddMaster  from './AddMaster/AddMaster';
import MaintenanceDetail from './MaintenanceDetail/Maintenance';
import Report from './Report/Report';

const Main = () => {
    return(
        <Routes>
            <Route path='/addMaster' element={<AddMaster/>}/>
            <Route path='/addDetail' element={<MaintenanceDetail></MaintenanceDetail>}/>
            <Route path='/Report' element={<Report></Report>}/>
        </Routes>
    )
}

export default Main