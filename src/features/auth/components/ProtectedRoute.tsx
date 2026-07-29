import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import {
  selectIsAuthenticated,
  selectAuthHydrated,
  selectHasPermission,
} from "@/store/slices/authSlice";
import type { Permission } from "@/features/auth/types/permission-types";

interface ProtectedRouteProps {
  /** Optional — require this permission to access the route */
  permission?: Permission;
  /** Where to redirect unauthenticated users. Defaults to `/auth/login`. */
  redirectTo?: string;
  /** Where to redirect unauthorized users. Defaults to `/403`. */
  unauthorizedTo?: string;
}

/**
 * Route guard that protects admin routes.
 *
 * - Not authenticated → redirect to login
 * - Authenticated but missing required permission → redirect to 403
 * - Authenticated + has permission → render children
 *
 * @example
 * ```tsx
 * <Route element={<ProtectedRoute />}>
 *   <Route path="dashboard" element={<Dashboard />} />
 * </Route>
 *
 * <Route element={<ProtectedRoute permission="users:read" />}>
 *   <Route path="users" element={<UsersPage />} />
 * </Route>
 * ```
 */
const ProtectedRoute = ({
  permission,
  redirectTo = "/auth/login",
  unauthorizedTo = "/403",
}: ProtectedRouteProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const hydrated = useAppSelector(selectAuthHydrated);

  // Wait for auth hydration before deciding
  if (!hydrated) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (permission) {
    // Dynamic selector: selectHasPermission(permission) returns a selector fn
    const hasPermission = useAppSelector(selectHasPermission(permission));

    if (!hasPermission) {
      return <Navigate to={unauthorizedTo} replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
