import { Outlet } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { Toaster } from '@/components/ui/sonner';
import KotlinFuncLayout from './KotlinFuncLayout';

const Layouts = () => {
  return (
    <KotlinFuncLayout>
      <AuthLayout>
        <Outlet />
        <Toaster />
      </AuthLayout>
    </KotlinFuncLayout>
  );
};

export default Layouts;
