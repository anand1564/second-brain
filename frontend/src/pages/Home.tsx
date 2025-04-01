// import { Sidebar } from "lucide-react"
// import { Button } from "@/components/Button"
// import  Content  from "@/components/Content"
// import { TweetCard } from "@/components/Tweet"

// export const Home=()=>{
//      return (
//           <div className='grid grid-cols-2'>
//             <Sidebar/>
//             <div>
//            <Button variant="primary" text="Primary Button" startIcon={<span>👍</span>} />
//            <Content />
//            <TweetCard title="Tweet Card" tweetId="1866495131571916948"/>
//            </div>
//           </div>
//         )
// }
import { useEffect, useState } from "react";
import { TweetCard } from "@/components/Tweet";

const Home = () => {
  const [url, setUrl] = useState("");
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [tags,setTags]=useState<string[]>([]);
  const [preview, setPreview] = useState<any>(null);

  const extractTweetId = (url: string) => {
    const match = url.match(/status\/(\d+)/);
    return match ? match[1] : null;
  };
  const isTweet = (url: string) => {
    const twitterRegex = /^https?:\/\/(www\.)?x\.com\/\w+\/status\/(\d+)/;
    return twitterRegex.test(url);
  };
  const addContent = async () => {
    fetch('http://localhost:3000/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        url,
        tags,
        userId: 1 // Assuming you have a userId to associate with the content
      })
    })
  }

  useEffect(() => {
    const fetchMetadata = async () => {
      const response = await fetch("http://localhost:3000/content/user/1");
      const data = await response.json();
  
      if (isTweet(data.url)) {
        setPreview({ type: "tweet", tweetId: extractTweetId(data.url) });
      } else {
        const metaResponse = await fetch("http://localhost:3000/fetch-meta", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: data.url }),
        });
  
        const metaData = await metaResponse.json();
        setPreview({ type: "link", ...metaData });
      }
    };
    fetchMetadata();
  }, [url]); // Add url to the dependency array

  return (
    <div>
      <input type="text" placeholder="Enter the title" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
      <input
        type="text"
        placeholder="Enter a URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input type="text" placeholder="Enter the description" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
      <input
  type="text"
  placeholder="Enter the tags"
  value={tags.join(',')} // Convert array to string for input value
  onChange={(e) => setTags(e.target.value.split(','))} // Convert string back to array
/>
      <button onClick={addContent}>Add Content</button>

      {preview && preview.type === "tweet" ? (
  <TweetCard title="Tweet" tweetId={preview.tweetId} />
) : (
  <div>
    <h3>{preview.title || "No title"}</h3>
    <p>{preview.description}</p>
    {preview.image && <img src={preview.image} alt="Preview" width={200} />}
  </div>
)}

    </div>
  );
};

export default Home;
