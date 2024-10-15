import { useUser } from '@/APIs/user/get';
import useUnstrictEffect from '@/hooks/useUnstrictEffect';
import { useUserStore } from '@/stores/userStore';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  // Hooks
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  // API Calls
  const { data: userData, isSuccess } = useUser();

  useEffect(() => {
    if (isSuccess && userData) {
      setUser(userData.data.user);
    }
  }, []);

  useEffect(() => {
    // @ts-ignore
    if (Kakao.isInitialized() === false) {
      // @ts-ignore
      Kakao.init(import.meta.env.VITE_KAKAO_CLIENT_ID);
    }
  });

  return <>{children}</>;
};

export default AuthLayout;
