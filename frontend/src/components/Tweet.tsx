import { Suspense } from 'react';
import { TweetSkeleton, EmbeddedTweet, TweetNotFound } from 'react-tweet';
import { fetchTweet, Tweet } from 'react-tweet/api';
import { kv } from '@vercel/kv';

// Fetch the tweet data
async function getTweet(
  id: string,
  fetchOptions?: RequestInit
): Promise<Tweet | undefined> {
  try {
    const { data, tombstone, notFound } = await fetchTweet(id, fetchOptions);

    if (data) {
      await kv.set(`tweet:${id}`, data); // Cache the tweet
      return data;
    } else if (tombstone || notFound) {
      await kv.del(`tweet:${id}`); // Remove from cache if not found or private
    }
  } catch (error) {
    console.error('fetching the tweet failed with:', error);
  }

  // Fallback to cached data if available
  const cachedTweet = await kv.get<Tweet>(`tweet:${id}`);
  return cachedTweet ?? undefined;
}

// Server Component: Display the tweet
const TweetPage = async ({ id }: { id: string }) => {
  try {
    const tweet = await getTweet(id);
    return tweet ? <EmbeddedTweet tweet={tweet} /> : <TweetNotFound />;
  } catch (error) {
    console.error('Error rendering tweet:', error);
    return <TweetNotFound />;
  }
};

// Dynamic page to render the tweet
const Page = ({ params }: { params: { id: string } }) => {
  if (!params?.id) {
    return <TweetNotFound />;
  }

  return (
    <Suspense fallback={<TweetSkeleton />}>
      <TweetPage id={params.id} />
    </Suspense>
  );
};

export default Page;
