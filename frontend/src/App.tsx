
import { AddContent } from './pages/AddContent'
import Home from './pages/Home'
import './App.css'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import LandingPage from './pages/Landing'
import GoogleSignIn from './components/GoogleSignIn'
import Content from './components/Content'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/content/:userId" element={<Content/>}/>
      <Route path="/:id" element={<Home/>}/>
      <Route path="/content/:userId/add" element={<AddContent />} />
      <Route path="/auth" element={<GoogleSignIn />} />
      <Route path="/" element={<LandingPage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
