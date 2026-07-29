import type { ReactNode } from "react";
import { useMemo } from "react";
import type { Permission } from "@/features/auth/types/permission-types";
import { useAppSelector } from "@/store/hooks";
import { selectUserPermissions } from "@/store/slices/authSlice";

interface CanProps {
  /** Single permission required */
  permission?: Permission;
  /** Multiple permissions required */
  permissions?: Permission[];
  /** Match strategy when `permissions` is an array. Defaults to `"all"`. */
  mode?: "all" | "any";
  /** Rendered when the user does NOT have the required permission(s) */
  fallback?: ReactNode;
  children: ReactNode;
}

/**
 * Permission gate component.
 *
 * Conditionally renders `children` only when the current user has the
 * required permission(s). Optionally shows a `fallback` otherwise.
 *
 * @example
 * ```tsx
 * <Can permission="users:create">
 *   <Button onClick={onCreate}>Create User</Button>
 * </Can>
 *
 * <Can
 *   permissions={["users:read", "users:update"]}
 *   mode="all"
 *   fallback={<Badge variant="outline">Read only</Badge>}
 * >
 *   <ButtonGroup>
 *     <Button>Edit</Button>
 *     <Button>Delete</Button>
 *   </ButtonGroup>
 * </Can>
 * ```
 */
const Can = ({
  permission,
  permissions = [],
  mode = "all",
  fallback = null,
  children,
}: CanProps) => {
  const userPermissions = useAppSelector(selectUserPermissions);

  const hasAccess = useMemo(() => {
    if (permission) {
      return userPermissions.includes(permission);
    }
    if (permissions.length) {
      return mode === "all"
        ? permissions.every((p) => userPermissions.includes(p))
        : permissions.some((p) => userPermissions.includes(p));
    }
    return true;
  }, [permission, permissions, mode, userPermissions]);

  if (!hasAccess) return <>{fallback}</>;

  return <>{children}</>;
};

export default Can;
