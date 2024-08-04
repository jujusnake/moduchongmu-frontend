import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/signin", { replace: true });
  }, []);

  return <>{children}</>;
};

export default AuthLayout;
