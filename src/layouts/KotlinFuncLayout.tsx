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

  useEffect(() => {
    if (deviceType !== 'androidwv') return;

    const mo = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.target === document.body) {
          const enableRefresh = document.body.hasAttribute('data-scroll-locked') === false;
          window.AndroidWV?.updateSwipeRefresher(enableRefresh);
        }
      }
    });

    mo.observe(document.body, { attributes: true, attributeFilter: ['data-scroll-locked'] });

    return () => {
      mo.disconnect();
    };
  }, []);

  return <>{children}</>;
};

export default KotlinFuncLayout;
