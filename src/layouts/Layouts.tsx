import { Outlet } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { Toaster } from '@/components/ui/sonner';

const Layouts = () => {
  return (
    <AuthLayout>
      <Outlet />
      <Toaster />
    </AuthLayout>
  );
};

export default Layouts;
