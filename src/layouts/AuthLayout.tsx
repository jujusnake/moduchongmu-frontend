import { useUser } from '@/APIs/user/get';
import { getTokens, removeTokens } from '@/lib/auth';
import { getCleanPathname } from '@/lib/utils';
import { useUserStore } from '@/stores/userStore';
import { PRIVATE_PATHS, PUBLIC_PATHS } from '@/types/auth';
import { Loader2 } from 'lucide-react';
import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  // Hooks
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const { pathname } = useLocation();

  // API Calls
  const { refetch: getUserData, isFetching } = useUser({ enabled: false });

  // Lifecycle
  useEffect(() => {
    // Init Kakao SDK
    // @ts-ignore
    if (Kakao.isInitialized() === false) {
      // @ts-ignore
      Kakao.init(import.meta.env.VITE_KAKAO_CLIENT_ID);
    }
  });

  useEffect(() => {
    // 첫 진입 시 분기 처리
    const cleanPathname = getCleanPathname(pathname);
    if (PUBLIC_PATHS.includes(cleanPathname)) handleLandingPublic();
    else if (PRIVATE_PATHS.includes(cleanPathname)) handleLandingPrivate(cleanPathname);
  }, []);

  const handleLandingPublic = () => {
    const { accessToken, refreshToken } = getTokens();

    if (accessToken === null && refreshToken === null) {
      console.log('No tokens, stay and signin');
      return;
    } else {
      getUserData({ throwOnError: true })
        .then((res) => {
          setUser(res.data?.data.user ?? null);
          console.log('Landing on public, and got user data, moving to private');
          navigate('/now');
        })
        .catch(() => {
          console.log('Landing on public, but failed to get user data');
        });
    }
  };

  const handleLandingPrivate = (cleanPathname: string) => {
    const { accessToken, refreshToken } = getTokens();

    if (accessToken === null && refreshToken === null) {
      console.log('No tokens, move to signin');
      navigate('/signin');
      return;
    } else {
      getUserData({ throwOnError: true })
        .then((res) => {
          setUser(res.data?.data.user ?? null);
          if (res.data?.data.user.userName === null) {
            console.log('Landing on private, but no username, move to signup');
            navigate('/signup');
            return;
          } else if (cleanPathname === '/signup') navigate('/now');
          else console.log('Landing on private, and got user data, stay');
        })
        .catch(() => {
          console.log('Landing on private, but failed to get user data, move to signin');
          removeTokens();
          navigate('/signin');
        });
    }
  };

  return (
    <>
      {children}
      {isFetching && (
        <div className="z-[999] fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-bg-base/60">
          <Loader2 size={80} className="animate-spin text-brand-primary-dark" />
        </div>
      )}
    </>
  );
};

export default AuthLayout;
