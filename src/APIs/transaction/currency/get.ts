import { axiosPrivateInstance } from '@/APIs/axios';
import { ErrorResponse } from '@/types/axios';
import { GetCurrencyRes } from '@/types/transaction';
import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

const getCurrencies = async (country?: string | null) => {
  const res = await axiosPrivateInstance.get('/transaction/currency', {
    params: {
      country,
    },
  });

  return res as AxiosResponse<GetCurrencyRes>;
};

const useCurrencies = (country?: string | null) => {
  const query = useQuery<AxiosResponse<GetCurrencyRes>, AxiosError<ErrorResponse>>({
    queryKey: ['currencies', country],
    queryFn: () => getCurrencies(country),
  });

  return query;
};

export { useCurrencies };
