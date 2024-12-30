import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePostSignin } from '@/APIs/signin/post';
import { SocialSigninType } from '@/types/signin';
import { Loader2 } from 'lucide-react';
import { setTokens } from '@/lib/auth';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/buttons';
import { DialogClose } from '@radix-ui/react-dialog';
import { SESSIONSTORAGE_KEYS } from '@/constants/storage';
import { useEffect } from 'react';

const SigninRedirect = () => {
  // hooks
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // API Calls
  const { mutate: postSignin, isPending, isError } = usePostSignin();

  // Lifecycle
  useEffect(() => {
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

          const invitationUid = sessionStorage.getItem(SESSIONSTORAGE_KEYS.invitationTravelUid);

          if (data.data.processType === 'signin') {
            navigate(invitationUid ? `/invitation/${invitationUid}` : '/');
          } else {
            navigate(invitationUid ? `/signup?invitation=${invitationUid}` : '/signup');
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
        className="fixed flex flex-col items-center justify-center gap-4 px-8 py-6 text-base font-semibold rounded-lg shadow-lg shadow-brand-primary-darker/10 absolute-center bg-brand-primary-lighter/20 text-brand-primary-darker data-[show=false]:invisible"
        data-show={isPending}
      >
        <Loader2 size={50} className="animate-spin" />
        로그인 중...
      </div>

      <Dialog open={isError}>
        <DialogContent className="bg-bg-back max-w-moduchongmu">
          <DialogHeader className="text-start">
            <DialogTitle className="text-lg font-bold text-text-primary">로그인 정보가 만료되었습니다</DialogTitle>
            <DialogDescription className="text-base font-medium text-text-secondary">
              다시 로그인 해주세요
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-2 gap-1 min-[640px]:gap-0">
            <DialogClose asChild onClick={() => navigate('/signin')}>
              <Button size="medium">다시 로그인하기</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SigninRedirect;
