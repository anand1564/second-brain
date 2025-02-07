import { useEffect, useState } from "react"
import { Card } from "./Card";
import { useNavigate } from "react-router-dom";


export default function Content(){
     const navigate = useNavigate();
     const [content,setContent] = useState([]);
     const handleDisplay=()=>{
          
     }
     useEffect(()=>{
          fetch('http://localhost:3000/content/1')
          .then(res=>res.json())
          .then(data=>setContent(data));
     },[])
     return(
          <div className="flex flex-col-2 items-center justify-items-start gap-6">
               <div className="">
                    <h1>Your Links</h1>
                    <div className="flex items-center justify-center">
                    {content.map((cont:any)=>(
                         <Card title={cont.title} description={cont.description} type={cont.type}/>
                    ))}
                    </div>
               </div>
               <div>
                    <button onClick={()=>{navigate('/add')}}>Add Content</button>
               </div>
          </div>
     )
}