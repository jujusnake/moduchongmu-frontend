import SocialSigninButton from '@/components/atoms/SocialSigninButton';
import TextRotation from '@/components/atoms/TextRotation';

const Signin = () => {
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
              {(['naver', 'kakao', 'google', 'apple'] as const).map((carrier) => (
                <SocialSigninButton
                  key={carrier}
                  carrier={carrier}
                  onClick={() => {
                    if (window.Android) {
                      window.Android.onSocialSignin(carrier);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <aside className="text-xs text-text-aside">
          로그인함으로써 <a className="underline text-text-primary">이용약관</a> 및{' '}
          <a className="underline text-text-primary">개인정보취급방침</a>에 동의합니다
        </aside>
      </section>
    </div>
  );
};

export default Signin;
