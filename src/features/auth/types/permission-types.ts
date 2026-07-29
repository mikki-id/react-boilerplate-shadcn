/**
 * Permission system types for RBAC.
 *
 * Permissions follow a `resource:action` convention:
 *   `users:create`, `users:read`, `users:update`, `users:delete`
 *   `products:export`, `orders:import`, `reports:print`
 */

// ─── Primitive types ─────────────────────────────────────────────────
export type Resource =
  | "dashboard"
  | "users"
  | "roles"
  | "settings"
  | "reports"
  | "audit_logs"
  | "products"
  | "orders"
  | "content";

export type Action =
  | "create"
  | "read"
  | "update"
  | "delete"
  | "manage"
  | "export"
  | "import"
  | "print"
  | "archive"
  | "restore"
  | "approve"
  | "reject";

/** Template-literal type: e.g. "users:create" | "dashboard:read" */
export type Permission = `${Resource}:${Action}` | (string & {});

// ─── Role ────────────────────────────────────────────────────────────
export interface Role {
  id: string;
  name: string;
  label?: string;
  description?: string;
  permissions: Permission[];
}

// ─── Extended user — includes roles & resolved permissions ───────────
export interface AuthUserWithPermissions {
  name: string;
  email: string;
  phone: string;
  is_active: boolean;
  roles?: Role[];
  /** Flattened, deduplicated list of all permissions from all roles */
  permissions?: Permission[];
}
