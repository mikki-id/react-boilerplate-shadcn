import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Role, Permission } from "@/features/auth/types/permission-types";

// ─── Types ───────────────────────────────────────────────────────────
export interface AuthUser {
  name: string;
  email: string;
  phone: string;
  is_active: boolean;
  roles?: Role[];
  permissions?: Permission[];
}

export interface AuthState {
  /** JWT access token — `null` means unauthenticated */
  accessToken: string | null;
  /** Current authenticated user — `null` when not logged in */
  user: AuthUser | null;
  /** Whether an initial token-restore check has completed */
  _hydrated: boolean;
}

// ─── Initial state ───────────────────────────────────────────────────
const initialState: AuthState = {
  accessToken: null,
  user: null,
  _hydrated: false,
};

// ─── Slice ───────────────────────────────────────────────────────────
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Called after a successful login.
     * Stores token + user info in Redux; the caller (or a listener)
     * is responsible for persisting the token to localStorage.
     */
    setCredentials(
      state,
      action: PayloadAction<{ accessToken: string; user: AuthUser }>,
    ) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },

    /**
     * Clears all auth state — called on logout or 401.
     * The caller should also remove the token from localStorage
     * and redirect to the login page.
     */
    clearCredentials(state) {
      state.accessToken = null;
      state.user = null;
    },

    /**
     * Restores auth state from a persisted token on app boot.
     * Sets `_hydrated` to `true` so consumers know the check is done.
     */
    hydrate(state, action: PayloadAction<{ accessToken: string }>) {
      state.accessToken = action.payload.accessToken;
      state._hydrated = true;
    },

    /** Marks the hydration attempt as complete (even if no token found). */
    setHydrated(state) {
      state._hydrated = true;
    },
  },
});

export const { setCredentials, clearCredentials, hydrate, setHydrated } =
  authSlice.actions;

// ─── Base selectors ─────────────────────────────────────────────────
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAccessToken = (state: { auth: AuthState }) => state.auth.accessToken;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.accessToken !== null;
export const selectAuthHydrated = (state: { auth: AuthState }) =>
  state.auth._hydrated;

// ─── Permission selectors ───────────────────────────────────────────
/** Returns the full list of resolved permissions for the current user */
export const selectUserPermissions = (state: { auth: AuthState }): Permission[] =>
  state.auth.user?.permissions ?? [];

/** Returns the user's roles */
export const selectUserRoles = (state: { auth: AuthState }): Role[] | undefined =>
  state.auth.user?.roles;

/** Checks whether the user has a specific permission */
export const selectHasPermission =
  (permission: Permission) =>
  (state: { auth: AuthState }): boolean =>
    selectUserPermissions(state).includes(permission);

export default authSlice.reducer;
