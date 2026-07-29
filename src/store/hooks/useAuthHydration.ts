import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hydrate, setHydrated, selectAuthHydrated } from "@/store/slices/authSlice";
import { env } from "@/config/env";
import { getLocalStorage } from "@/utils/storage-utils";

/**
 * On app boot, restores the JWT token from localStorage (if present)
 * into the Redux store so the auth state survives page refreshes.
 *
 * Must be called once at the root of the app tree, before any
 * protected route or auth-dependent logic runs.
 */
export const useAuthHydration = () => {
  const dispatch = useAppDispatch();
  const hydrated = useAppSelector(selectAuthHydrated);

  useEffect(() => {
    if (hydrated) return;

    const token = getLocalStorage<string>(env.VITE_AUTH_TOKEN_SECRET);
    if (token) {
      dispatch(hydrate({ accessToken: token }));
    } else {
      dispatch(setHydrated());
    }
  }, [dispatch, hydrated]);
};
