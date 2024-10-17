import { AxiosError, AxiosResponse } from 'axios';
import { axiosPrivateInstance } from '../axios';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import { User } from '@/types/user';
import { ErrorResponse } from '@/types/axios';
import { getTokens } from '@/lib/auth';
import { queryKeys } from '../react-query';

const getUser = async () => {
  const res = await axiosPrivateInstance.get('/user');
  return res as AxiosResponse<User>;
};

const useUser = (params?: { enabled?: boolean }) => {
  const { accessToken } = getTokens();

  const query = useQuery<AxiosResponse<User>, AxiosError<ErrorResponse>>({
    queryKey: [queryKeys.user, accessToken],
    queryFn: getUser,
    ...params,
  });
  return query;
};

export { useUser };
