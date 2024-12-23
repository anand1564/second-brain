
import { AddContent } from './pages/AddContent'
import { Home } from './pages/Home'
import './App.css'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/:id" element={<Home/>}/>
      <Route path="/content/:id/add" element={<AddContent />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
