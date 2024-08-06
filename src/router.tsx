import { createBrowserRouter } from 'react-router-dom';
import Signin from './pages/Signin';
import Layouts from './layouts/Layouts';
import Signup from './pages/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layouts />,
    children: [
      { path: '/signin', element: <Signin /> },
      { path: '/signup', element: <Signup /> },
    ],
  },
]);

export { router };
