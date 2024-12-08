
import './App.css'
import { Button } from './components/Button'
import { Sidebar } from './components/Sidebar'
function App() {

  return (
    <div className='grid grid-cols-2'>
      <Sidebar/>
      <div>
     <Button variant="primary" text="Primary Button" startIcon={<span>👍</span>} />
     </div>
    </div>
  )
}

export default App
