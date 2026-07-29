import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";
import { clearCredentials } from "../slices/authSlice";

/**
 * Redux middleware that listens for any rejected (failed) API action
 * and — if the error was a 401 — clears auth credentials.
 *
 * This catches unauthenticated responses dispatched via
 * `createAsyncThunk` or RTK Query and keeps Redux in sync
 * with the actual auth state.
 */
export const authErrorMiddleware: Middleware = (store) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const statusCode = (action.payload as { status?: number })?.status;

    if (statusCode === 401) {
      store.dispatch(clearCredentials());
    }
  }

  return next(action);
};
