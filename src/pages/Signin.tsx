import SocialSigninButton from '@/components/atoms/SocialSigninButton';
import TextRotation from '@/components/atoms/TextRotation';
import { SOCIAL_SIGNIN, SocialSigninType } from '@/types/signin';
import { useEffect } from 'react';
import InviteDialog from './trip/components/InviteDialog';

const Signin = () => {
  window.initContent = (parameter) => {
    window.webkit.messageHandlers.moChong.postMessage(JSON.stringify({ action: 'log', type: 'initContent' }));
    console.log('initContent parameter', parameter);
  };

  const loginOAuth = (type: SocialSigninType) => {
    // @ts-ignore
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // iOS Swift WebView
    // @ts-ignore
    if (/iPhone|iPad|iPod/.test(userAgent) && !window.MSStream) {
      if (window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.moChong.postMessage(JSON.stringify({ action: 'login', type }));
        return;
      }
    }

    // Android Kotlin WebView
    if (/Android/.test(userAgent)) {
      // @ts-ignore
      if (typeof window.AndroidInterface !== 'undefined' || userAgent.includes('wv')) {
        console.log('Android Kotlin WebView');
        return;
      }
    }

    // Web Browser
    webSignin(type);
  };

  return (
    <div className="flex flex-col min-h-svh">
      <h1 className="relative flex items-end justify-center flex-1 py-12 bg-brand-primary-dark">
        <div className="w-[50%] aspect-square bg-black/30"></div>
        <img
          aria-disabled
          alt=""
          src="/signin/signin-round.svg"
          className="absolute top-full -translate-y-[2px] w-full -z-10 select-none"
        />
      </h1>

      <section className="flex flex-col items-center justify-end flex-1 gap-10 px-4 pt-12 pb-4">
        <div className="flex flex-col items-center justify-center flex-grow">
          <TextRotation
            className="text-xl font-semibold mb-10 h-[22.5px]"
            textArr={[
              '여행을 떠나볼까요?',
              '복잡한 정산을 맡겨주세요!',
              '스트레스 없이하는 여행',
              '이번 목적지는 어디로?!',
            ]}
          />
          <div>
            <div className="flex items-center gap-2 mb-4">
              <hr className="flex-grow" />
              <span className="text-base font-medium">로그인</span>
              <hr className="flex-grow" />
            </div>
            <div className="flex items-center justify-center gap-4">
              {SOCIAL_SIGNIN.map((carrier) => (
                <SocialSigninButton
                  key={`social-signin-btn-${carrier}`}
                  carrier={carrier}
                  onClick={() => loginOAuth(carrier)}
                />
              ))}
            </div>
          </div>
        </div>

        <aside className="text-xs text-text-aside">
          로그인함으로써 <a className="underline text-text-primary">이용약관</a> 및{' '}
          <a className="underline text-text-primary">개인정보취급방침</a>에 동의합니다
        </aside>
        <InviteDialog travelUid="T7igpzfU8k" />
      </section>
    </div>
  );
};

export default Signin;

const webSignin = (type: SocialSigninType) => {
  switch (type) {
    case 'naver': {
      const clientID = import.meta.env.VITE_NAVER_CLIENT_ID;
      const callbackUrl = location.protocol + '//' + location.host + '/signin/redirect?type=naver';
      const stateString = 'RANDOM_STATE';
      const URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${clientID}&response_type=code&redirect_uri=${callbackUrl}&state=${stateString}`;
      window.location.href = URL;
      return;
    }
    case 'kakao':
      // @ts-ignore
      Kakao.Auth.authorize({
        redirectUri: location.protocol + '//' + location.host + '/signin/redirect?type=kakao',
      });
      return;
    case 'google': {
      const clientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      const redirectUrl = location.protocol + '//' + location.host + '/signin/redirect?type=google';
      const URL = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${clientID}
		&redirect_uri=${redirectUrl}
		&response_type=code
		&scope=email profile`;
      window.location.href = URL;
      return;
    }
  }
};
