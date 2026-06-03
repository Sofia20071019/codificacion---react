import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AsignacionOrden from './pages/AsignacionOrden'
import AsignacionMaterial from './pages/AsignacionMaterial'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AsignacionOrden />} />
        <Route path="/AsignacionOrden" element={<AsignacionOrden />} />
        <Route path="/AsignacionMaterial" element={<AsignacionMaterial />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App