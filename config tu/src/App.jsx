import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AsignacionOrden from './pages/asignacionOrden'
import AsignacionMaterial from './pages/asignacionMaterial'

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='asignacionMaterial' element={<AsignacionMaterial/>}/>
        <Route path='asignacionOrden' element={<AsignacionOrden/>}/>
      </Routes>
    </BrowserRouter>

  )
   
}

export default App