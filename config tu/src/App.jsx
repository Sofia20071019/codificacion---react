import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Editarempleados from './pages/Editarempleados'
import Aprobarpago from './pages/Aprobarpago'
import Dashboardadmin from './pages/Dashboardadmin'
import GestionEmpleados from './pages/Gestiempleados'
import PanelReportes from './pages/Panelreportes'

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/dashboardadmin' element={<Dashboardadmin/>}/>
        <Route path='/gestionempleados' element={<GestionEmpleados/>}/>
        <Route path='/panereportes' element={<PanelReportes/>}/>
        <Route path='/editarempleados' element={<Editarempleados/>}/>
        <Route path='/aprobarpago' element={<Aprobarpago/>}/>
      </Routes>
    </BrowserRouter>

  )
   
}

export default App
