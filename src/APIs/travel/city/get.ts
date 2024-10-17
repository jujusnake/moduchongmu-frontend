import { axiosPrivateInstance } from '@/APIs/axios';
import { ErrorResponse } from '@/types/axios';
import { GetTravelCityErrorCodes, GetTravelCityRes } from '@/types/travel';
import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

const getCities = async (searchString: string) => {
  const res = await axiosPrivateInstance.get(`/travel/city?searchString=${searchString}`);
  return res as AxiosResponse<GetTravelCityRes>;
};

const useCitySearch = (searchString: string) => {
  const query = useQuery<AxiosResponse<GetTravelCityRes>, AxiosError<ErrorResponse<GetTravelCityErrorCodes>>>({
    queryKey: ['cities', searchString],
    queryFn: () => getCities(searchString),
  });

  return query;
};

export { useCitySearch };
