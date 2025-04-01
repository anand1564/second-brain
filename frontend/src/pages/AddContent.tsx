
import { useState } from "react";
import { useParams } from "react-router-dom";
export const AddContent=()=>{
     const [title,setTitle] = useState('');
     const [description,setDescription] = useState('');
     const [link,setLink] = useState('');
     const {userId} = useParams();
     const [file,setFile] = useState('');
     const [tags,setTags] = useState([]);

     const handleSubmit=async (e:any )=>{
          e.preventDefault();
          const response = await fetch(`http://localhost:3000/${userId}/content/add`,{
               method:'POST',
               headers:{
                    'Content-Type':'application/json'
               },
               body:JSON.stringify({
                    title:title,
                    description:description,
                    url: link
               })
          })
          if(response.ok){
               const data = await response.json();
               console.log(data);
               window.alert('Content added successfully.');
          }else{
               console.error('Failed to add content');
          }
     }
     return(
          <div>
               <h1>Add Content</h1>
               <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Title" onChange={(e)=>setTitle(e.target.value)}/>
                    <input type="text" placeholder="Description" onChange={(e)=>setDescription(e.target.value)}/>
                    <input type="text" placeholder="url" onChange={(e)=>setLink(e.target.value)}/>
                    <input type="file" placeholder="file" onChange={(e)=>setFile(e.target.value)}/>
                    <input type="text" placeholder="tags" onChange={(e)=>setTags(...tags)}/>
                    <button type="submit">Add</button>
               </form>
          </div>
     )
}