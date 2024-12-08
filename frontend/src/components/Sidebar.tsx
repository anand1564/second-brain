

export const Sidebar=()=>{
     return(
          <div className="absolute top-0 left-0 mt-4">
               <h1 className="text-2xl font-bold">Second Brain</h1>
               <div className="flex flex-col gap-5 mt-7">
                    <ul className="flex flex-col gap-2">
                         <li> Tweets</li>
                         <li> Videos</li>
                         <li> Documents</li>
                         <li> Links</li>
                         <li> Tags</li>
                    </ul>
               </div>
          </div>
     )
}