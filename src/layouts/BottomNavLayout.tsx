import { BottomNavigation } from '@/components/organism/navigation';
import { Outlet } from 'react-router-dom';

const BottomNavLayout = () => {
  return (
    <>
      <Outlet />
      <div className="h-20">
        <BottomNavigation />
      </div>
    </>
  );
};

export default BottomNavLayout;
