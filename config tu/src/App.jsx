import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Gestiempleados from './pages/Gestiempleados'
import Aprobarpago from './pages/Aprobarpago'

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/gestionempleados' element={<Gestiempleados/>}/>
        <Route path='/aprobarpago' element={<Aprobarpago/>}/>
      </Routes>
    </BrowserRouter>

  )
   
}

export default App
