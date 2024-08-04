import { createBrowserRouter } from "react-router-dom";
import Signin from "./pages/Signin";
import Layouts from "./layouts/Layouts";

const router = createBrowserRouter([
  { path: "/", element: <Layouts />, children: [{ path: "/signin", element: <Signin /> }] },
]);

export { router };
