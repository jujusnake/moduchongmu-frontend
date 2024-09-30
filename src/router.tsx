import { createBrowserRouter } from 'react-router-dom';
import Signin from './pages/Signin';
import Layouts from './layouts/Layouts';
import Signup from './pages/Signup';
import Home from './layouts/BottomNavLayout';
import Trips from './pages/Trips';
import CreateTrip from './pages/CreateTrip';
import Now from './pages/Now';
import Currency from './pages/Currency';
import My from './pages/My';
import Trip from './pages/Trip';
import TripSettlement from './pages/TripSettlement';
import CreateTransaction from './pages/CreateTransaction';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layouts />,
    children: [
      { path: '/signin', element: <Signin /> },
      { path: '/signup', element: <Signup /> },
      { path: '/createtrip', element: <CreateTrip /> },
      { path: '/createtransaction', element: <CreateTransaction /> },
      { path: '/trip/:travelUid', element: <Trip /> },
      { path: '/trip/:travelUid/settlement', element: <TripSettlement /> },
      {
        path: '/',
        element: <Home />,
        children: [
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
