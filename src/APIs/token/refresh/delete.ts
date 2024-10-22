import { axiosPrivateInstance } from '@/APIs/axios';

const deleteRefreshToken = async () => {
  try {
    const res = axiosPrivateInstance.delete(`/token/refresh`);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export { deleteRefreshToken };
