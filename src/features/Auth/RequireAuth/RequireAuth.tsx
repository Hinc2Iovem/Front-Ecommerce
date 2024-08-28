import { Navigate, Outlet, useLocation } from "react-router-dom";
import { JwtPayload, jwtDecode } from "jwt-decode";
import useAuth from "../../../hooks/Auth/useAuth";

type RequireAuthTypes = {
  allowedRoles: string[];
};

export interface DecodedTypes extends JwtPayload {
  UserInfo: {
    username: string;
    userId: string;
    roles: string[];
  };
}

export default function RequireAuth({ allowedRoles }: RequireAuthTypes) {
  const { auth } = useAuth();
  const location = useLocation();
  const decoded = auth?.accessToken
    ? jwtDecode<DecodedTypes>(auth.accessToken)
    : undefined;
  const roles: string[] = decoded?.UserInfo?.roles || [];

  return roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
}
