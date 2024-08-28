import { axiosPrivate } from "../../api/axios";
import useAuth from "./useAuth";

type GetRefreshTypes = {
  accessToken: string;
};

export default function useRefreshToken() {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const res = await axiosPrivate
      .get<GetRefreshTypes>("/auth/refresh")
      .then((r) => {
        setAuth(() => {
          return {
            accessToken: r.data.accessToken,
          };
        });
        return r;
      });
    return res.data.accessToken;
  };
  return refresh;
}
