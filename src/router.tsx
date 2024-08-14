import { createBrowserRouter } from 'react-router-dom';
import Signin from './pages/Signin';
import Layouts from './layouts/Layouts';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Trips from './pages/Trips';
import CreateTrip from './pages/CreateTrip';
import Now from './pages/Now';
import Currency from './pages/Currency';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layouts />,
    children: [
      { path: '/signin', element: <Signin /> },
      { path: '/signup', element: <Signup /> },
      { path: '/createtrip', element: <CreateTrip /> },
      {
        path: '/',
        element: <Home />,
        children: [
          { path: 'trips', element: <Trips /> },
          { path: 'now', element: <Now /> },
          { path: 'currency', element: <Currency /> },
        ],
      },
    ],
  },
]);

export { router };
