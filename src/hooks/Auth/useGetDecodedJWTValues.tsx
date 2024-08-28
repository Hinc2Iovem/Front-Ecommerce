import { jwtDecode } from "jwt-decode";
import useAuth from "./useAuth";
import { DecodedTypes } from "../../features/Auth/RequireAuth/RequireAuth";

export default function useGetDecodedJWTValues() {
  const { auth } = useAuth();
  const decoded = auth?.accessToken
    ? jwtDecode<DecodedTypes>(auth.accessToken)
    : undefined;
  return {
    roles: decoded?.UserInfo.roles,
    userId: decoded?.UserInfo.userId,
    username: decoded?.UserInfo.username,
  };
}
