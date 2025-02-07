
import { AddContent } from './pages/AddContent'
import { Home } from './pages/Home'
import './App.css'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import LandingPage from './pages/Landing'
import GoogleSignIn from './components/GoogleSignIn'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/:id" element={<Home/>}/>
      <Route path="/content/:id/add" element={<AddContent />} />
      <Route path="/auth" element={<GoogleSignIn />} />
      <Route path="/" element={<LandingPage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
