import { useEffect, useState } from "react";
import { UserTypes } from "../../types/ProfileTypes";
import { getUser } from "../../api/queries/userQueries";

export default function useGetUser({ userId }: { userId: string }) {
  const [user, setUser] = useState<UserTypes | object>({});
  useEffect(() => {
    getUser({ userId }).then((r) => {
      if (r) {
        setUser(r);
      }
    });
  }, [userId]);

  return user as UserTypes;
}
