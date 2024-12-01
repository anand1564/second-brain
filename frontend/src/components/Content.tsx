import { useEffect, useState } from "react"


export default function Content(){
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
                         <div>
                         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleDisplay}>
                              {cont.title}</button>
                         </div>
                    ))}
                    </div>
               </div>
               <div>
                    <button>Add Content</button>
               </div>
          </div>
     )
}