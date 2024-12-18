import { createBrowserRouter } from 'react-router-dom';
import Signin from './pages/Signin';
import Layouts from './layouts/Layouts';
import Signup from './pages/Signup';
import BottomNavLayout from './layouts/BottomNavLayout';
import Trips from './pages/Trips';
import CreateTrip from './pages/CreateTrip';
import Now from './pages/Now';
import Currency from './pages/Currency';
import My from './pages/my-page/My';
import Trip from './pages/Trip';
import TripSettlement from './pages/TripSettlement';
import CreateTransaction from './pages/CreateTransaction';
import SigninRedirect from './pages/auth/SigninRedirect';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layouts />,
    children: [
      { path: '/signin', element: <Signin /> },
      { path: '/signin/redirect', element: <SigninRedirect /> },
      { path: '/signup', element: <Signup /> },
      { path: '/createtrip', element: <CreateTrip /> },
      { path: '/createtransaction', element: <CreateTransaction /> },
      { path: '/trip/:travelUid', element: <Trip /> },
      { path: '/trip/:travelUid/settlement', element: <TripSettlement /> },
      {
        path: '/',
        element: <BottomNavLayout />,
        children: [
          { index: true, element: <Now /> },
          { path: 'trips', element: <Trips /> },
          { path: 'now', element: <Now /> },
          { path: 'currency', element: <Currency /> },
          { path: 'my', element: <My /> },
        ],
      },
    ],
  },
]);

export { router };
