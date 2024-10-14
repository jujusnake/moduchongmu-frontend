import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // navigate("/signin", { replace: true });
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
