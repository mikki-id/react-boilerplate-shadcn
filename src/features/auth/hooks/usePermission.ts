import { useMemo } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectUserPermissions } from "@/store/slices/authSlice";
import type { Permission } from "@/features/auth/types/permission-types";

type MatchMode = "all" | "any";

interface UsePermissionsOptions {
  /** Match strategy — all required or any one. Defaults to `"all"`. */
  match?: MatchMode;
}

/**
 * Check whether the current user has a specific permission.
 *
 * @example
 * ```ts
 * const canCreate = usePermission("users:create");
 * const canManage = usePermission("settings:manage");
 * ```
 */
export const usePermission = (permission: Permission): boolean => {
  const permissions = useAppSelector(selectUserPermissions);

  return useMemo(
    () => permissions.includes(permission),
    [permissions, permission],
  );
};

/**
 * Check multiple permissions at once.
 *
 * @example
 * ```ts
 * // All required (default)
 * const canManageUsers = usePermissions(["users:read", "users:update"]);
 *
 * // Any one is enough
 * const canAccessReports = usePermissions(
 *   ["reports:read", "reports:manage"],
 *   { match: "any" },
 * );
 * ```
 */
export const usePermissions = (
  permissions: Permission[],
  options: UsePermissionsOptions = {},
): boolean => {
  const { match = "all" } = options;
  const userPermissions = useAppSelector(selectUserPermissions);

  return useMemo(() => {
    if (!permissions.length) return true;

    if (match === "all") {
      return permissions.every((p) => userPermissions.includes(p));
    }

    return permissions.some((p) => userPermissions.includes(p));
  }, [permissions, userPermissions, match]);
};

/**
 * Get all permissions for the current user.
 *
 * @example
 * ```ts
 * const allPermissions = useUserPermissions();
 * // → ["dashboard:read", "users:read", "users:create", …]
 * ```
 */
export const useUserPermissions = (): Permission[] => {
  return useAppSelector(selectUserPermissions);
};
