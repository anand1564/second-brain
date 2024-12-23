
import { useState } from "react";
export const AddContent=()=>{
     const [title,setTitle] = useState('');
     const [description,setDescription] = useState('');
     const [type,setType] = useState('');
     const [link,setLink] = useState('');

     const handleSubmit=(e:any)=>{
          e.preventDefault();
          fetch('http://localhost:3000/content/create/1/',{
               method:'POST',
               headers:{
                    'Content-Type':'application/json'
               },
               body:JSON.stringify({
                    title,
                    description,
                    type,
                    link: type=='Youtube' || 'Tweet' ? link : '',
               })
          })
     }
     return(
          <div>
               <h1>Add Content</h1>
               <form>
                    <input type="text" placeholder="Title" onChange={(e)=>setTitle(e.target.value)}/>
                    <input type="text" placeholder="Description" onChange={(e)=>setDescription(e.target.value)}/>
                    <input type="text" placeholder="Type" onChange={(e)=>setType(e.target.value)}/>
                    {type=='Youtube' || 'Tweet' ? <input type="text" placeholder="Link" onChange={(e)=>setLink(e.target.value)}/> : ''}
                    <button onSubmit={handleSubmit}>Add</button>
               </form>
          </div>
     )
}