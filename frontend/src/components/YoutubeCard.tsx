import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface YoutubeCardProps {
  title: string;
  videoId: string;
}

export function YoutubeCard({ title, videoId }: YoutubeCardProps) {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={thumbnailUrl}
          alt={title}
          width={320}
          height={180}
          className="rounded-md"
        />
      </CardContent>
    </Card>
  )
}

