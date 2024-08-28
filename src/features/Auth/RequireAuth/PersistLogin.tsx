import { useEffect, useState } from "react";
import useRefreshToken from "../../../hooks/Auth/useRefreshToken";
import useAuth from "../../../hooks/Auth/useAuth";
import { Outlet } from "react-router-dom";

export default function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {

        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, [refresh, auth?.accessToken]);
  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
}
