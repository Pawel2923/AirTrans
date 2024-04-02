import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Airplane from './components/Airplane'
import AddAirplane from './components/AddAirplane'

function App() {
  return (
    <>
      <Nav />
      <div className="container mt-3">
        <Routes>
          <Route path="/airplane" element={<Airplane />} />
          <Route path="/add" element={<AddAirplane />} />
        </Routes>
      </div>
    </>
  )
}

export default App
