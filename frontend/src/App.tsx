
import { AddContent } from './pages/AddContent'
import { Home } from './pages/Home'
import './App.css'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import AuthCard from './pages/Auth'
import LandingPage from './pages/Landing'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/:id" element={<Home/>}/>
      <Route path="/content/:id/add" element={<AddContent />} />
      <Route path="/auth" element={<AuthCard />} />
      <Route path="/" element={<LandingPage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
