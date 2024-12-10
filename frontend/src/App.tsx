

import './App.css'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { Sidebar } from './components/Sidebar'
import { YoutubeCard } from './components/YoutubeCard'
import { TweetCard } from './components/Tweet'
function App() {

  return (
    <div className='grid grid-cols-2'>
      <Sidebar/>
      <div>
     <Button variant="primary" text="Primary Button" startIcon={<span>👍</span>} />
     <Card title="Card Title" description="Card Description" type="Card Type"/>
     <YoutubeCard title="Youtube Card" videoId="dQw4w9WgXcQ"/>
     <TweetCard title="Tweet Card" tweetId="1866495131571916948"/>
     </div>
    </div>
  )
}

export default App
