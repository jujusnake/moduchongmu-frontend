import { createBrowserRouter } from 'react-router-dom';
import Signin from './pages/Signin';
import Layouts from './layouts/Layouts';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Trips from './pages/Trips';
import CreateTrip from './pages/CreateTrip';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layouts />,
    children: [
      { path: '/signin', element: <Signin /> },
      { path: '/signup', element: <Signup /> },
      {
        path: '/',
        element: <Home />,
        children: [
          { path: 'trips', element: <Trips /> },
          { path: 'createtrip', element: <CreateTrip /> },
        ],
      },
    ],
  },
]);

export { router };
