import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const usePosts = (userId?: string) => {
  const url = userId ? `https://twiiterx-corp.vercel.app/api/posts?userId=${userId}` : 'https://twiiterx-corp.vercel.app/api/posts';
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default usePosts;
