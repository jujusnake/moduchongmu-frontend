import { axiosInstance } from '@/APIs/axios';
import { AxiosResponse } from 'axios';

const getNewAccessToken = async (refreshToken: string) => {
  const res = await axiosInstance.get(`/token/access?refreshToken=${refreshToken}`);
  return res as AxiosResponse<{ accessToken: string }>;
};

export { getNewAccessToken };
