import { createBrowserRouter } from 'react-router-dom';
import Signin from './pages/Signin';
import Layouts from './layouts/Layouts';
import Signup from './pages/Signup';
import BottomNavLayout from './layouts/BottomNavLayout';
import Trips from './pages/trips/Trips';
import CreateTrip from './pages/create-trip/CreateTrip';
import Now from './pages/Now';
import Currency from './pages/Currency';
import My from './pages/my-page/My';
import Trip from './pages/trip/Trip';
import TripSettlement from './pages/settlement/TripSettlement';
import CreateTransaction from './pages/create-transaction/CreateTransaction';
import SigninRedirect from './pages/auth/SigninRedirect';
import Invitation from './pages/invitation/Invitation';
import EditTrip from './pages/trip/EditTrip';
import EditTransaction from './pages/trip/EditTransaction';
import SigninKotlin from './pages/auth/SigninKotlin';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layouts />,
    children: [
      { path: '/invitation/:tripUid', element: <Invitation /> },
      { path: '/signin', element: <Signin /> },
      { path: '/signin/redirect', element: <SigninRedirect /> },
      { path: '/signup', element: <Signup /> },
      { path: '/createtrip', element: <CreateTrip /> },
      { path: '/createtransaction', element: <CreateTransaction /> },
      { path: '/createtransaction/:tripUid', element: <CreateTransaction /> },
      { path: '/trip/:tripUid', element: <Trip /> },
      { path: '/trip/:tripUid/edit', element: <EditTrip /> },
      // { path: '/trip/:tripUid/transaction/:transactionUid/edit', element: <EditTransaction /> },
      { path: '/trip/:tripUid/settlement', element: <TripSettlement /> },
      { path: '/signin/kotlin', element: <SigninKotlin /> },
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
