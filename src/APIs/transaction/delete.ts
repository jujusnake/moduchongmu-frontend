import { useMutation } from '@tanstack/react-query';
import { axiosPrivateInstance } from '../axios';
import { AxiosResponse } from 'axios';

const deleteTransaction = async (uid: string) => {
  const res = await axiosPrivateInstance.delete(`/transaction`, {
    params: {
      uid,
    },
  });

  return res as AxiosResponse<{ uid: string }>;
};

const useDeleteTransaction = () => {
  const mutation = useMutation({
    mutationFn: deleteTransaction,
  });

  return mutation;
};

export { useDeleteTransaction };
