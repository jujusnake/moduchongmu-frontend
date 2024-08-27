import SocialSigninButton from '@/components/atoms/SocialSigninButton';
import TextRotation from '@/components/atoms/TextRotation';

const Signin = () => {
  window.initContent = (parameter) => {
    window.webkit.messageHandlers.moChong.postMessage(JSON.stringify({ action: 'log', type: 'initContent' }));
    console.log('initContent parameter', parameter);
  };

  const loginOAuth = (type: 'naver' | 'kakao' | 'google' | 'apple') => {
    window.webkit.messageHandlers.moChong.postMessage(JSON.stringify({ action: 'login', type }));
  };

  return (
    <div className="flex flex-col min-h-svh">
      <h1 className="bg-brand-primary-dark relative flex items-end justify-center flex-1 py-12">
        <div className="w-[50%] aspect-square bg-black/30"></div>
        <img
          aria-disabled
          alt=""
          src="/signin/signin-round.svg"
          className="absolute top-full -translate-y-[2px] w-full -z-10 select-none"
        />
      </h1>

      <section className="px-4 pb-4 pt-12 flex flex-col items-center justify-end gap-10 flex-1">
        <div className="flex-grow flex flex-col items-center justify-center">
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
            <div className="flex gap-2 items-center mb-4">
              <hr className="flex-grow" />
              <span className="text-base font-medium">로그인</span>
              <hr className="flex-grow" />
            </div>
            <div className="flex gap-4 items-center justify-center">
              <SocialSigninButton type="naver" onClick={() => loginOAuth('naver')} />
              <SocialSigninButton type="kakao" onClick={() => loginOAuth('kakao')} />
              <SocialSigninButton type="google" onClick={() => loginOAuth('google')} />
              <SocialSigninButton type="apple" onClick={() => loginOAuth('apple')} />
            </div>
          </div>
        </div>

        <aside className="text-text-aside text-xs">
          로그인함으로써 <a className="text-text-primary underline">이용약관</a> 및{' '}
          <a className="text-text-primary underline">개인정보취급방침</a>에 동의합니다
        </aside>
      </section>
    </div>
  );
};

export default Signin;
