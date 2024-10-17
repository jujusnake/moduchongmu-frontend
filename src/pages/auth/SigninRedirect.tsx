import { useNavigate, useSearchParams } from 'react-router-dom';
import useUnstrictEffect from '@/hooks/useUnstrictEffect';
import { usePostSignin } from '@/APIs/signin/post';
import { SocialSigninType } from '@/types/signin';
import { Loader2 } from 'lucide-react';
import { setTokens } from '@/lib/auth';
import { Dialog } from '@/components/ui/dialog';

const SigninRedirect = () => {
  // hooks
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // API Calls
  const { mutate: postSignin, isPending, isError } = usePostSignin();

  // Lifecycle
  useUnstrictEffect(() => {
    const type = searchParams.get('type') as SocialSigninType;
    const code = searchParams.get('code');

    if (!type || !code) {
      return;
    }

    postSignin(
      { type, code },
      {
        onSuccess: (data) => {
          setTokens({ oauthType: type, accessToken: data.data.accessToken, refreshToken: data.data.refreshToken });

          if (data.data.processType === 'signin') {
            navigate('/');
          } else {
            navigate('/signup');
          }
        },
        onError: (error) => {
          console.log(error);
        },
        onSettled: () => {},
      },
    );
  });

  return (
    <>
      <div
        className="fixed flex flex-col items-center justify-center gap-4 px-8 py-6 text-base font-semibold rounded-lg shadow-lg shadow-brand-primary-darker/10 absolute-center bg-brand-primary-lighter/20 text-brand-primary-darker data-[show=true]:invisible"
        data-show={isPending}
      >
        <Loader2 size={50} className="animate-spin" />
        로그인 중...
      </div>

      <Dialog open={isError}>asdfasdf</Dialog>
    </>
  );
};

export default SigninRedirect;
