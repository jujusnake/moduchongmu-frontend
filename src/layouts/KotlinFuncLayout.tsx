import { useDeviceStore } from '@/stores/deviceStore';
import { SocialSigninType } from '@/types/signin';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KotlinFuncLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { deviceType } = useDeviceStore();

  useEffect(() => {
    if (deviceType !== 'androidwv') return;
    if (typeof window !== 'undefined') {
      window.kotlin = {
        handleKotlinToken: (type: SocialSigninType, accessToken: string) => {
          console.log('accessToken from Kotlin: ', accessToken);
          navigate(`/signin/kotlin?type=${type}&token=${encodeURIComponent(accessToken)}`);
        },
      };
    }
  }, []);

  return <>{children}</>;
};

export default KotlinFuncLayout;
