import { useTravelInvite } from '@/APIs/travel/invite/post';
import { useUser } from '@/APIs/user/get';
import SocialSigninButton from '@/components/atoms/SocialSigninButton';
import { Button } from '@/components/ui/buttons';
import { SESSIONSTORAGE_KEYS } from '@/constants/storage';
import { SOCIAL_SIGNIN, SocialSigninType } from '@/types/signin';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const Invitation = () => {
  // Hooks
  const { tripUid } = useParams<{ tripUid: string }>();
  const navigate = useNavigate();

  // API Calls
  const { isSuccess, isPending, isError } = useUser();
  const { mutate: acceptInvitation, isPending: isAcceptingInvitation } = useTravelInvite();

  // Handlers
  const loginOAuth = (type: SocialSigninType) => {
    tripUid && sessionStorage.setItem(SESSIONSTORAGE_KEYS.invitationTravelUid, tripUid);

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

  const handleJoin = () => {
    tripUid &&
      acceptInvitation(tripUid, {
        onSuccess: () => {
          toast.success('여행에 참여하였습니다!');
          navigate(`/trip/${tripUid}`);
        },
        onError: () => {
          toast.error('여행 참여에 실패하였습니다. 다시 시도해주세요.');
        },
      });
  };

  // Lifecycle
  useEffect(() => {
    sessionStorage.removeItem(SESSIONSTORAGE_KEYS.invitationTravelUid);
  }, []);

  // Render
  if (tripUid === undefined) {
    return (
      <main className="flex items-center justify-center min-h-dvh">
        <div className="flex flex-col items-center text-center">
          <h1 className="mb-3 text-xl font-semibold text-functional-error-dark">여행을 찾을 수 없습니다</h1>
          <p className="text-base">초대하신 분께 다시 링크를 요청해주세요 🥲</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-dvh">
      {isSuccess && (
        <div className="flex flex-col items-center text-center">
          <h1 className="mb-4 text-xl font-semibold">... 여행에 참여하시겠습니까?</h1>
          <Button disabled={isAcceptingInvitation} className="gap-0" onClick={handleJoin}>
            <span
              className={`whitespace-nowrap overflow-hidden  transition-[width,_opacity] ${isAcceptingInvitation ? 'w-0 opacity-0' : 'w-[49px] opacity-100'}`}
            >
              참여하기
            </span>
            <span
              className={`whitespace-nowrap overflow-hidden  transition-[width,_opacity] ${!isAcceptingInvitation ? 'w-0 opacity-0' : 'w-[115px] opacity-100'}`}
            >
              여행에 참여하는 중...
            </span>
          </Button>
        </div>
      )}
      {isError && (
        <div className="flex flex-col items-center text-center">
          <h1 className="mb-12 text-xl font-semibold">로그인을 하고 여행에 참여하세요!</h1>

          <div className="flex items-center w-full gap-2 mb-4 text-border-main">
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
      )}
      {isPending && <div className="flex flex-col items-center text-center">초대장 준비중...</div>}
    </main>
  );
};

export default Invitation;

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
