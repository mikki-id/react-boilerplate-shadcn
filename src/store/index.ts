import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";
import { authErrorMiddleware } from "./middleware/authMiddleware";

/**
 * Root Redux store.
 *
 * Keeps **client-side** state only:
 * - `auth`     → JWT token, current user, hydration status
 * - `ui`       → sidebar, theme, toasts, modal state
 *
 * **Server state** (API data) belongs in TanStack Query —
 * do NOT add RTK Query or server-cache slices here unless
 * there is a specific cross-cutting reason.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authErrorMiddleware),
});

// ─── Inferred types ─────────────────────────────────────────────────
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
