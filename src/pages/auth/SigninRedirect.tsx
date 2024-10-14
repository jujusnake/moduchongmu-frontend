import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const SigninRedirect = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const signinType = searchParams.get('type');

    if (signinType === 'naver') {
      getTokenNaver();
    }
  }, []);

  const getTokenNaver = async () => {
    const code = searchParams.get('code');
    const clientID = import.meta.env.VITE_NAVER_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_NAVER_CLIENT_SECRET;

    try {
      let res = await axios.get('https://nid.naver.com/oauth2.0/token', {
        params: {
          grant_type: 'authorization_code', // 발급
          client_id: clientID,
          client_secret: clientSecret,
          code,
          state: 'naver', // cross-site request forgery 방지를 위한 상태 토큰
        },
      });

      console.log(res);
    } catch (e) {
      console.log(e);
    }

    // // Access Token으로 user data 조회
    // const res = await axios.get('https://openapi.naver.com/v1/nid/me', {
    //   headers: { Authorization: `Bearer ${accessToken}` },
    // });
    // console.log('[get naver user info response]', res);
    // const { email, name } = res.data.response;
  };

  return <div>SigninRedirect</div>;
};

export default SigninRedirect;
