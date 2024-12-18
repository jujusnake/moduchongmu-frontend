import axios from 'axios';
import { getNewAccessToken } from './token/access/get';
import { LOCALSTORAGE_KEYS } from '@/constants/storage';
import { getTokens, removeTokens, setTokens } from '@/lib/auth';

const baseURL = import.meta.env.VITE_API_BASE_URL as string;

const axiosInstance = axios.create({ baseURL });

const axiosPrivateInstance = axios.create({ baseURL });

axiosPrivateInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosPrivateInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { accessToken, refreshToken } = getTokens();

    if (accessToken === null || refreshToken === null) {
      removeTokens();
      window.location.href = '/signin';
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (error.response.status === 403) {
      try {
        const res = await getNewAccessToken(refreshToken);
        const newAccessToken = res?.data.accessToken;
        setTokens({ accessToken: newAccessToken });
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest); // Retry the original request with the new access token.
      } catch (refreshError) {
        removeTokens();
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

// axiosPrivateInstance.interceptors.response.use(
//   async function (response) {
//     return response;
//   },
//   async function (error) {
//     const {
//       config,
//       response: { status },
//     } = error;

//     const { accessToken, refreshToken } = getTokens();

//     // if (
//     //   accessToken === null ||
//     //   refreshToken === null ||
//     //   (status === 401 && error.response.data.message === 'Unauthorized')
//     // ) {
//     //   // 토큰이 없거나 잘못되었을 경우
//     //   // 로그인 페이지로 이동
//     //   removeTokens();
//     //   window.location.href = '/signin';
//     //   return;
//     // }

//     if (status === 403 && error.response.data.message === 'Forbidden') {
//       try {
//         const res = await getNewAccessToken(refreshToken);

//         console.log(res);
//       } catch (e) {
//         // console.log(e);
//       }

//       // try {
//       //   const tokenRefreshResult = await instance.post('/refresh-token');
//       //   if (tokenRefreshResult.status === 200) {
//       //     const { accessToken, refreshToken } = tokenRefreshResult.data;
//       //     // 새로 발급받은 토큰을 스토리지에 저장
//       //     localStorage.setItem('accessToken', accessToken);
//       //     localStorage.setItem('refreshToken', refreshToken);
//       //     // 토큰 갱신 성공. API 재요청
//       //     return instance(config);
//       //   } else {
//       //     logout();
//       //   }
//       // } catch (e) {
//       //   logout();
//       // }
//     }

//     return Promise.reject(error);
//   },
// );

export { axiosInstance, axiosPrivateInstance };
