
interface CardProps{
     title:string;
     description: string;
     type: string;
}


export const Card=(props:CardProps)=>{
     return(
          <div className="flex flex-col items-center justify-start">
               <div className="flex items-start">
                    <h1 className="text-lg font-bold">{props.title}</h1>
                    <p className="text-sm text-gray-500">{props.type}</p>
               </div>
          </div>
     )
}