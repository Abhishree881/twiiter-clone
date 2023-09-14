import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR('https://twiiterx-corp.vercel.app/api/users', fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useUsers;
