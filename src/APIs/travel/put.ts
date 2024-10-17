import { PutTravelParams } from '@/types/travel';
import { axiosPrivateInstance } from '../axios';

const putTravel = (params: PutTravelParams) => {
  const res = axiosPrivateInstance.put('/travel', params);
};
