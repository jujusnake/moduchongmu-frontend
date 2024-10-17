import { AxiosError, AxiosResponse } from 'axios';
import { axiosPrivateInstance } from '../axios';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import { User } from '@/types/user';
import { ErrorResponse } from '@/types/axios';

const getUser = async () => {
  const res = await axiosPrivateInstance.get('/user');
  return res as AxiosResponse<User>;
};

const useUser = (params?: { enabled?: boolean }) => {
  const query = useQuery<AxiosResponse<User>, AxiosError<ErrorResponse>>({
    queryKey: ['user'],
    queryFn: getUser,
    ...params,
  });
  return query;
};

export { useUser };
