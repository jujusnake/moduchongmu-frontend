import { BottomNavigation } from '@/components/organism/navigation';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   // now가 있는지에 따라 다르게 네비게이션
  //   if (typeof 'now' !== 'string') {
  //     navigate('/now', { replace: true });
  //   } else {
  //     navigate('/trips', { replace: true });
  //   }
  // }, []);

  return (
    <>
      <Outlet />
      <div className="h-20">
        <BottomNavigation />
      </div>
    </>
  );
};

export default Home;
