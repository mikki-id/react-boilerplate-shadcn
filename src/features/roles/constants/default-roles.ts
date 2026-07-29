import type { Role } from "@/features/auth/types/permission-types";

/**
 * Default role definitions used as a starting point.
 * In production, these would come from the API.
 */
export const DEFAULT_ROLES: Role[] = [
  {
    id: "admin",
    name: "admin",
    label: "Administrator",
    description: "Full system access with all permissions",
    permissions: [
      "dashboard:read",
      "users:create", "users:read", "users:update", "users:delete", "users:export", "users:import",
      "roles:create", "roles:read", "roles:update", "roles:delete",
      "settings:read", "settings:update", "settings:manage",
      "reports:read", "reports:create", "reports:export", "reports:print", "reports:archive",
      "audit_logs:read", "audit_logs:export",
      "products:create", "products:read", "products:update", "products:delete", "products:export", "products:import", "products:archive", "products:restore",
      "orders:create", "orders:read", "orders:update", "orders:delete", "orders:export", "orders:import", "orders:print", "orders:approve", "orders:reject",
      "content:create", "content:read", "content:update", "content:delete", "content:archive", "content:restore",
    ],
  },
  {
    id: "manager",
    name: "manager",
    label: "Manager",
    description: "Can manage users, view reports, and handle orders",
    permissions: [
      "dashboard:read",
      "users:read", "users:create", "users:update",
      "roles:read",
      "settings:read",
      "reports:read", "reports:export", "reports:print",
      "audit_logs:read",
      "products:read", "products:create", "products:update",
      "orders:read", "orders:create", "orders:update", "orders:approve", "orders:reject", "orders:export",
      "content:read", "content:create", "content:update",
    ],
  },
  {
    id: "editor",
    name: "editor",
    label: "Editor",
    description: "Can create and edit content and products",
    permissions: [
      "dashboard:read",
      "users:read",
      "dashboard:read",
      "products:read", "products:create", "products:update",
      "orders:read",
      "content:read", "content:create", "content:update",
    ],
  },
  {
    id: "viewer",
    name: "viewer",
    label: "Viewer",
    description: "Read-only access to most resources",
    permissions: [
      "dashboard:read",
      "users:read",
      "settings:read",
      "reports:read",
      "products:read",
      "orders:read",
      "content:read",
    ],
  },
];
