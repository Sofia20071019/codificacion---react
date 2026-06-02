import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import gestiempleados from './pages/gestiempleados'

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='gestiempleados' element={<gestiempleados/>}/>
      </Routes>
    </BrowserRouter>

  )
   
}

export default App
