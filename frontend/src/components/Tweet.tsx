import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tweet } from "react-tweet";
interface TweetCardProps {
  title: string;
  tweetId: string;
}

export function TweetCard({ title, tweetId }: TweetCardProps) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tweet id={tweetId} />
      </CardContent>
    </Card>
  )
}

