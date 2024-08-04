import { Outlet } from 'react-router-dom';
import AuthLayout from './AuthLayout';

const Layouts = () => {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

export default Layouts;
