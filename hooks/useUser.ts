import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useUser = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(userId ? `https://twiiterx-corp.vercel.app/api/users/${userId}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useUser;
