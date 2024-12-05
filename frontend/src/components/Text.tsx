import { useState } from "react"



const TextNotes=()=>{
     const [title,setTitle]=useState<string>('');
     const [description,setDescription]=useState<string>('');
     const [points,setPoints]=useState<string>('');
     return(
          <div>
               <h1>Notes</h1>
               <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
               <textarea placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
               <input type="text" placeholder="Points" value={points} onChange={(e)=>setPoints(e.target.value)}/>
               <button>Save</button>
          </div>
     )
}
export default TextNotes;