import axios from 'axios';

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
  async function (response) {
    return response;
  },
  async function (error) {
    const {
      config,
      response: { status },
    } = error;

    if (
      status === 401
      //  && error.message === 'InvalidTokenException'
    ) {
      // 토큰이 없거나 잘못되었을 경우
      // 로그인 페이지로 이동
    }
    if (
      status === 401
      // && data.message === 'TokenExpired'
    ) {
      // try {
      //   const tokenRefreshResult = await instance.post('/refresh-token');
      //   if (tokenRefreshResult.status === 200) {
      //     const { accessToken, refreshToken } = tokenRefreshResult.data;
      //     // 새로 발급받은 토큰을 스토리지에 저장
      //     localStorage.setItem('accessToken', accessToken);
      //     localStorage.setItem('refreshToken', refreshToken);
      //     // 토큰 갱신 성공. API 재요청
      //     return instance(config);
      //   } else {
      //     logout();
      //   }
      // } catch (e) {
      //   logout();
      // }
    }

    return Promise.reject(error);
  },
);

export { axiosInstance, axiosPrivateInstance };
