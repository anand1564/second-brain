import { YoutubeCard } from "./YoutubeCard";
import { TweetCard } from "./Tweet";
interface CardProps{
     title:string;
     description: string;
     type: string;
     link?:string
}

function getVideoId(link:string){
     const url = new URL(link);
     const searchParams = new URLSearchParams(url.search);
     return searchParams.get('v');
}

export const Card=(props:CardProps)=>{
     return(
          <div className="flex flex-col items-center justify-start">
               <div className="flex items-start">
                    <h1 className="text-lg font-bold">{props.title}</h1>
                    <p className="text-sm text-gray-500">{props.type}</p>
               </div>
               <div className="">
                    {props.type=='Youtube' ? <YoutubeCard title={props.title} videoId="yeatOU5vVsA"/> : <TweetCard title={props.title} tweetId="tweetId"/>}
               </div>
          </div>
     )
}