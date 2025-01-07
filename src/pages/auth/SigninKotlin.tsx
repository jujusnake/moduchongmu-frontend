import { usePostSigninNativeToken } from '@/APIs/signin/post';
import { SESSIONSTORAGE_KEYS } from '@/constants/storage';
import { setTokens } from '@/lib/auth';
import { SocialSigninType } from '@/types/signin';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SigninKotlin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { mutate: postSigninWithToken, isPending } = usePostSigninNativeToken();

  useEffect(() => {
    const type = searchParams.get('type') as SocialSigninType | null;
    const token = searchParams.get('token');

    if (type === null || token === null) {
      window.AndroidWV?.sendMessage('오류가 발생했습니다. 다시 로그인 해주세요.');
      navigate('/signin');
      return;
    }

    const decoded = decodeURIComponent(token);

    postSigninWithToken(
      { type, token: decoded },
      {
        onSuccess: (res) => {
          const { processType, accessToken, refreshToken } = res.data;
          setTokens({ oauthType: type, accessToken, refreshToken });

          const invitationUid = sessionStorage.getItem(SESSIONSTORAGE_KEYS.invitationTravelUid);
          if (processType === 'signin') {
            navigate(invitationUid ? `/invitation/${invitationUid}` : '/now');
          } else {
            navigate(invitationUid ? `/signup?invitation=${invitationUid}` : '/signup');
          }
        },
        onError: () => {
          window.AndroidWV?.sendMessage('오류가 발생했습니다. 다시 로그인 해주세요.');
          navigate('/signin');
        },
      },
    );
  }, [searchParams]);

  return (
    <div
      className="fixed flex flex-col items-center justify-center gap-4 px-8 py-6 text-base font-semibold rounded-lg shadow-lg shadow-brand-primary-darker/10 absolute-center bg-brand-primary-lighter/20 text-brand-primary-darker data-[show=false]:invisible"
      data-show={isPending}
    >
      <Loader2 size={50} className="animate-spin" />
      로그인 중...
    </div>
  );
};

export default SigninKotlin;
