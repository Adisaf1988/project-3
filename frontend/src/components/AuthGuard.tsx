import { FunctionComponent } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AuthGuarded<T extends JSX.IntrinsicAttributes>(
  Component: FunctionComponent<T>
) {
  return function useGuard(props: T) {
    const { user, loading } = useAuth();
    if (!user && !loading) {
      return <Navigate to="/login" />;
    }
    if (loading) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };
}
