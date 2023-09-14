import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR('https://twiiterx-corp.vercel.app/api/current', fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useCurrentUser;
