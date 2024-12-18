import { AxiosError, AxiosResponse } from 'axios';
import { axiosPrivateInstance } from '../axios';
import { DeleteUserRes } from '@/types/user';
import { useMutation } from '@tanstack/react-query';
import { ErrorResponse } from '@/types/axios';

const deleteUser = async () => {
  const res = await axiosPrivateInstance.delete('/user');
  return res as AxiosResponse<DeleteUserRes>;
};

const useDeleteUser = () => {
  const mutation = useMutation<AxiosResponse<DeleteUserRes>, AxiosError<ErrorResponse>, void>({
    mutationFn: deleteUser,
  });

  return mutation;
};

export { useDeleteUser };
