import { Sidebar } from "lucide-react"
import { Button } from "@/components/Button"
import  Content  from "@/components/Content"
import { TweetCard } from "@/components/Tweet"

export const Home=()=>{
     return (
          <div className='grid grid-cols-2'>
            <Sidebar/>
            <div>
           <Button variant="primary" text="Primary Button" startIcon={<span>👍</span>} />
           <Content />
           <TweetCard title="Tweet Card" tweetId="1866495131571916948"/>
           </div>
          </div>
        )
}